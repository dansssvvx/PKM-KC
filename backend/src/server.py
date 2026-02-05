from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import pickle
import numpy as np
import tensorflow as tf

# Serve `web/` as the static folder
# Try multiple path combinations to find model
BACKEND_ROOT = os.path.abspath(os.path.dirname(__file__))
PARENT_ROOT = os.path.abspath(os.path.join(BACKEND_ROOT, '..'))
PROJECT_ROOT = os.path.abspath(os.path.join(BACKEND_ROOT, '..', '..'))

# Try to find model in these locations (in order)
POSSIBLE_MODEL_PATHS = [
    os.path.join(BACKEND_ROOT, '..', 'model', 'gesture_classifier.keras'),  # backend/model/
    os.path.join(PROJECT_ROOT, 'model', 'gesture_classifier.keras'),         # root/model/
    os.path.join(PROJECT_ROOT, 'backend', 'model', 'gesture_classifier.keras'), # root/backend/model/
]
POSSIBLE_ENCODER_PATHS = [
    os.path.join(BACKEND_ROOT, '..', 'model', 'label_encoder.pkl'),  # backend/model/
    os.path.join(PROJECT_ROOT, 'model', 'label_encoder.pkl'),         # root/model/
    os.path.join(PROJECT_ROOT, 'backend', 'model', 'label_encoder.pkl'), # root/backend/model/
]

MODEL_PATH = None
ENCODER_PATH = None

for path in POSSIBLE_MODEL_PATHS:
    if os.path.exists(path):
        MODEL_PATH = path
        break

for path in POSSIBLE_ENCODER_PATHS:
    if os.path.exists(path):
        ENCODER_PATH = path
        break

WEB_FOLDER = os.path.join(PROJECT_ROOT, 'web')

app = Flask(__name__, static_folder=WEB_FOLDER, static_url_path='')

# Enable CORS for frontend connections (React on localhost:5173, localhost:3000, etc.)
CORS(app, origins=["http://localhost:3000", "http://localhost:5173", "http://localhost:5000", "http://127.0.0.1:3000", "http://127.0.0.1:5173"])

# Load model and label encoder at startup
model = None
label_encoder = None
try:
    if MODEL_PATH is None:
        raise FileNotFoundError("Model file not found in any of the expected locations")
    if ENCODER_PATH is None:
        raise FileNotFoundError("Label encoder file not found in any of the expected locations")
    
    print(f"Loading model from: {MODEL_PATH}")
    print(f"Loading encoder from: {ENCODER_PATH}")
    model = tf.keras.models.load_model(MODEL_PATH)
    with open(ENCODER_PATH, 'rb') as f:
        label_encoder = pickle.load(f)
    print('✓ Model and label encoder loaded successfully')
except Exception as e:
    print(f'✗ Error loading model or label encoder: {e}')
    import traceback
    traceback.print_exc()

@app.route('/')
def index():
    # Sends web/index.html
    return app.send_static_file('index.html')

@app.route('/health')
def health():
    return jsonify(status='ok', model_loaded=bool(model is not None))

@app.route('/predict', methods=['POST'])
def predict():
    """Accepts JSON with `landmarks`:
       - either a flat list [x,y,z,...] representing single-hand (63) or two-hands (126)
       - or a nested list [[h1_landmarks...], [h2_landmarks...]] where each hand is [[x,y,z],...]
       Returns JSON: {index, label, confidence}
    """
    if model is None or label_encoder is None:
        return jsonify(error='model_not_loaded'), 503

    data = request.get_json(force=True)
    landmarks = data.get('landmarks')
    if landmarks is None:
        return jsonify(error='missing_landmarks'), 400

    # Build feature vector of NUM_FEATURES = 21*3*2 = 126 (hand1 then hand2) to match app.py
    NUM_FEATURES = 21 * 3 * 2

    try:
        # If nested (list of hands), flatten per-hand
        if isinstance(landmarks, list) and len(landmarks) > 0 and isinstance(landmarks[0], list) and isinstance(landmarks[0][0], list):
            # landmarks is list of hands each being list of points [ [x,y,z], ... ]
            features = [0.0] * NUM_FEATURES
            # hand1
            if len(landmarks) >= 1:
                h1 = [float(v) for p in landmarks[0] for v in p]
                for i in range(min(len(h1), NUM_FEATURES//2)):
                    features[i] = h1[i]
            # hand2
            if len(landmarks) >= 2:
                h2 = [float(v) for p in landmarks[1] for v in p]
                offset = NUM_FEATURES // 2
                for i in range(min(len(h2), NUM_FEATURES//2)):
                    features[offset + i] = h2[i]
        else:
            # Flattened list (either 63 or 126 or other)
            flat = [float(x) for x in landmarks]
            if len(flat) == NUM_FEATURES:
                features = flat
            elif len(flat) == NUM_FEATURES // 2:
                # single hand -> put into first half, pad second half with zeros
                features = flat + [0.0] * (NUM_FEATURES // 2)
            else:
                # try to pad/truncate to NUM_FEATURES
                features = flat[:NUM_FEATURES] + [0.0] * max(0, NUM_FEATURES - len(flat))

        X = np.array(features, dtype=np.float32).reshape(1, NUM_FEATURES, 1)

        pred = model.predict(X, verbose=0)
        idx = int(np.argmax(pred, axis=1)[0])
        confidence = float(np.max(pred))
        try:
            label = label_encoder.inverse_transform([idx])[0]
        except Exception:
            label = str(idx)

        return jsonify(index=idx, label=label, confidence=confidence)
    except Exception as e:
        return jsonify(error='inference_failed', detail=str(e)), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
