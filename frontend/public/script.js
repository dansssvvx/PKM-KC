const videoElement = document.getElementById('webcam');
const canvasElement = document.getElementById('canvas');
const canvasCtx = canvasElement.getContext('2d');
const outputContainer = document.getElementById('output-container');

// --- Configuration ---
const config = {
    modelUrl: './model/model.json', // Path to the converted TF.js model
    labels: ['A', 'B', 'C', /* ...and so on */], // Your gesture labels
    // Use server-side inference (Flask `/predict`) by default so UI matches src/app.py behavior
    useServer: true,
    serverUrl: '/predict',
    sendIntervalMs: 200,
};

// --- ML Model Integration ---
let model = null;
let modelInputSize = null; // determined after loading model (number of features, e.g., 63 or 126) 

async function loadModel() {
    try {
        // Prefer loading as LayersModel (what tfjs.converters.save_keras_model produces)
        try {
            model = await tf.loadLayersModel(config.modelUrl);
            console.log('Model loaded as LayersModel');
        } catch (e) {
            // Fallback to GraphModel if LayersModel fails
            model = await tf.loadGraphModel(config.modelUrl);
            console.log('Model loaded as GraphModel (fallback)');
        }

        // Determine expected input size if possible
        if (model && model.inputs && model.inputs.length > 0 && model.inputs[0].shape) {
            // Example shape: [null, 63, 1] -> we want 63
            const shape = model.inputs[0].shape;
            modelInputSize = shape[1] || shape[0] || null;
            console.log('Determined model input shape:', shape, '-> inputSize=', modelInputSize);
        }

        // Warm up the model with inferred shape or sensible default
        const warmSize = modelInputSize || 63;
        try {
            const dummyInput = tf.randomNormal([1, warmSize, 1]);
            model.predict(dummyInput).dispose();
            console.log('Model warmed up.');
        } catch (e) {
            console.warn('Warm-up failed:', e.message || e);
        }

        console.log('Model loaded successfully!');
    } catch (error) {
        console.error('Error loading model:', error);
        outputContainer.textContent = 'Error loading model';
    }
} 
// Call this function to start loading the model
// loadModel();


// Helper: build 2-hand feature vector (21 landmarks * 3 coords per hand * 2 hands = 126)
function buildTwoHandFeatures(multiHandLandmarks) {
    const NUM_FEATURES = 21 * 3 * 2;
    const half = NUM_FEATURES / 2; // 63
    const features = new Array(NUM_FEATURES).fill(0);

    if (!multiHandLandmarks || multiHandLandmarks.length === 0) return features;

    // hand1
    if (multiHandLandmarks.length >= 1) {
        const h1 = multiHandLandmarks[0].flatMap(lm => [lm.x, lm.y, lm.z]);
        for (let i = 0; i < Math.min(h1.length, half); i++) {
            features[i] = h1[i];
        }
    }
    // hand2
    if (multiHandLandmarks.length >= 2) {
        const h2 = multiHandLandmarks[1].flatMap(lm => [lm.x, lm.y, lm.z]);
        for (let i = 0; i < Math.min(h2.length, half); i++) {
            features[half + i] = h2[i];
        }
    }
    return features;
}

// --- Main Application Logic ---

function onResults(results) {
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const landmarks = results.multiHandLandmarks[0];
        
        // Draw landmarks and connectors
        drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 5 });
        drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', radius: 6 });

        // Predict gesture: prefer server-side if enabled
        if (config.useServer) {
            const flattenedLandmarks = buildTwoHandFeatures(results.multiHandLandmarks);
            // rate-limited POST to server
            const now = Date.now();
            if (!window.__lastSentAt || now - window.__lastSentAt > config.sendIntervalMs) {
                window.__lastSentAt = now;

                // If we know the server is unavailable, skip and show status
                if (window.__serverAvailable === false) {
                    outputContainer.textContent = 'Server Offline';
                    return;
                }

                fetch(config.serverUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ landmarks: flattenedLandmarks })
                }).then(r => {
                    if (!r.ok) {
                        console.warn('Server returned non-OK', r.status);
                        outputContainer.textContent = 'Server Err';
                        return r.json().catch(()=>({error:'no-json'}));
                    }
                    return r.json();
                }).then(json => {
                    if (!json) return;
                    if (json && json.label) {
                        outputContainer.textContent = `${json.label} (${(json.confidence * 100).toFixed(1)}%)`;
                    } else if (json && json.error) {
                        console.warn('Server prediction error', json);
                        outputContainer.textContent = 'Server Err';
                    }
                }).catch(e => {
                    console.error('Failed to get server prediction', e);
                    outputContainer.textContent = 'Server Err';
                });
            }
        } else {
            // Local inference fallback (client-side model)
            // Preprocess landmarks
            const flattenedLandmarks = landmarks.flatMap(lm => [lm.x, lm.y, lm.z]);

            // Prepare input: pad or trim to modelInputSize if known
            let inputArr = flattenedLandmarks;
            if (modelInputSize) {
                if (inputArr.length < modelInputSize) {
                    inputArr = inputArr.concat(new Array(modelInputSize - inputArr.length).fill(0));
                } else if (inputArr.length > modelInputSize) {
                    inputArr = inputArr.slice(0, modelInputSize);
                }
            }

            // If modelInputSize unknown, use current landmarks size
            const effectiveSize = modelInputSize || inputArr.length;

            const inputTensor = tf.tensor2d([inputArr], [1, effectiveSize]).expandDims(2);

            // Run inference
            let prediction = null;
            try {
                prediction = model.predict(inputTensor);

                // Get the result (support both Tensor and Tensor-like outputs)
                let probabilities = null;
                if (Array.isArray(prediction)) {
                    probabilities = prediction[0].dataSync();
                } else if (prediction.dataSync) {
                    probabilities = prediction.dataSync();
                } else {
                    console.warn('Unknown prediction format', prediction);
                }

                const predictedClassIndex = Array.from(prediction.as1D().argMax().dataSync())[0];
                const predictedClass = config.labels[predictedClassIndex] || 'Unknown';
                const confidence = probabilities ? Math.max(...probabilities) : 0;

                // Display the result
                outputContainer.textContent = `${predictedClass} (${(confidence * 100).toFixed(1)}%)`;

            } catch (e) {
                console.error('Inference error:', e);
                outputContainer.textContent = 'Err';
            } finally {
                // Dispose tensors
                if (inputTensor) inputTensor.dispose();
                if (prediction && prediction.dispose) prediction.dispose();
            }
        }

    } else {
        outputContainer.textContent = '?';
    }
    canvasCtx.restore();
}

// 1. Setup MediaPipe Hands
const hands = new Hands({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
});

hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.7
});

// 2. Attach listener to receive results from MediaPipe
hands.onResults(onResults);

// 3. Setup and start camera
const camera = new Camera(videoElement, {
    onFrame: async () => {
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;
        await hands.send({ image: videoElement });
    },
    width: 640,
    height: 480
});
camera.start();

// Display loading state and try to load labels and model
outputContainer.textContent = 'Loading model...';

// Try to load labels from model folder (optional)
async function loadLabels() {
    try {
        const resp = await fetch('./model/labels.json');
        if (!resp.ok) throw new Error('No labels.json');
        const lbls = await resp.json();
        config.labels = lbls;
        console.log('Labels loaded from model/labels.json');
    } catch (e) {
        console.warn('labels.json not found, using default labels. Create web/model/labels.json with label array to override.');
    }
}

(async () => {
    await loadLabels();
    await loadModel();
    outputContainer.textContent = '?';
    console.log('SignTalk application started (model and labels loaded).');

    // Periodically check server health so we can avoid futile /predict calls when it's down
    async function checkServer() {
        try {
            const r = await fetch('/health');
            if (r.ok) {
                window.__serverAvailable = true;
                //console.log('Server healthy');
            } else {
                window.__serverAvailable = false;
                console.warn('Server health check returned non-ok', r.status);
            }
        } catch (e) {
            window.__serverAvailable = false;
            //console.warn('Server health check failed', e);
        }
    }

    // Run an initial check and then every 5s
    await checkServer();
    setInterval(checkServer, 5000);
})();
