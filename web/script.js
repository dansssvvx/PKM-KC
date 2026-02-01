const videoElement = document.getElementById('webcam');
const canvasElement = document.getElementById('canvas');
const canvasCtx = canvasElement.getContext('2d');
const outputContainer = document.getElementById('output-container');

// --- Configuration ---
const config = {
    modelUrl: './model/model.json', // Path to the converted TF.js model
    labels: ['A', 'B', 'C', /* ...and so on */], // Your gesture labels
};

// --- ML Model Integration ---
let model = null;

async function loadModel() {
    try {
        // Load the converted Keras model
        model = await tf.loadGraphModel(config.modelUrl);
        console.log("Model loaded successfully!");
        // Warm up the model
        const dummyInput = tf.randomNormal([1, 63, 1]);
        model.predict(dummyInput).dispose();
        console.log("Model warmed up.");
    } catch (error) {
        console.error("Error loading model:", error);
        outputContainer.textContent = "Error";
    }
}
// Call this function to start loading the model
// loadModel();


// --- Main Application Logic ---

function onResults(results) {
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const landmarks = results.multiHandLandmarks[0];
        
        // Draw landmarks and connectors
        drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 5 });
        drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', radius: 6 });

        // Predict gesture if model is loaded
        if (model) {
            // Preprocess landmarks
            const flattenedLandmarks = landmarks.flatMap(lm => [lm.x, lm.y, lm.z]);
            const inputTensor = tf.tensor2d([flattenedLandmarks], [1, 63]).expandDims(2);
            
            // Run inference
            const prediction = model.predict(inputTensor);
            
            // Get the result
            const probabilities = prediction.dataSync();
            const predictedClassIndex = prediction.as1D().argMax().dataSync()[0];
            const predictedClass = config.labels[predictedClassIndex];
            const confidence = Math.max(...probabilities);

            // Display the result
            outputContainer.textContent = `${predictedClass} (${(confidence * 100).toFixed(1)}%)`;
            
            // Dispose tensors
            inputTensor.dispose();
            prediction.dispose();
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

console.log("SignTalk application started. Make sure to call loadModel() after converting and adding your model files.");
