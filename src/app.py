import cv2
import mediapipe as mp
import numpy as np
import tensorflow as tf
import pickle
import os

# --- Configuration ---
MODEL_PATH = 'model/gesture_classifier.keras'
ENCODER_PATH = 'model/label_encoder.pkl'
NUM_FEATURES = 21 * 3 * 2 # 126 features for two hands

# --- Load Model and Encoder ---
if not os.path.exists(MODEL_PATH) or not os.path.exists(ENCODER_PATH):
    print("Error: Model or label encoder not found.")
    print("Please train the model first by running src/model_training.py")
    exit()

print("Loading model and label encoder...")
model = tf.keras.models.load_model(MODEL_PATH)
with open(ENCODER_PATH, 'rb') as f:
    label_encoder = pickle.load(f)
print("Model and label encoder loaded successfully.")

# --- MediaPipe Initialization ---
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(
    static_image_mode=False,
    max_num_hands=2, # Changed to detect two hands
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5
)
mp_drawing = mp.solutions.drawing_utils

def extract_landmarks(hand_landmarks):
    """Extracts and flattens landmarks from a single hand."""
    return np.array([[lm.x, lm.y, lm.z] for lm in hand_landmarks.landmark]).flatten()

# --- Main Application Logic ---
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Error: Could not open webcam.")
    exit()

print("Webcam opened successfully. Press 'q' to quit.")
current_prediction = ""
prediction_confidence = 0

while cap.isOpened():
    success, image = cap.read()
    if not success:
        print("Ignoring empty camera frame.")
        continue

    image = cv2.flip(image, 1)
    rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = hands.process(rgb_image)

    display_text = "No hand detected"
    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            mp_drawing.draw_landmarks(
                image,
                hand_landmarks,
                mp_hands.HAND_CONNECTIONS
            )

        # --- Prediction Logic for Two Hands ---
        landmarks_for_model = np.zeros(NUM_FEATURES)
        if len(results.multi_hand_landmarks) == 2:
            hand1_landmarks = extract_landmarks(results.multi_hand_landmarks[0])
            hand2_landmarks = extract_landmarks(results.multi_hand_landmarks[1])
            landmarks_for_model = np.concatenate([hand1_landmarks, hand2_landmarks])
        elif len(results.multi_hand_landmarks) == 1:
            hand1_landmarks = extract_landmarks(results.multi_hand_landmarks[0])
            landmarks_for_model[:len(hand1_landmarks)] = hand1_landmarks
        
        X = np.expand_dims(landmarks_for_model, axis=0)
        X = np.expand_dims(X, axis=2)

        prediction = model.predict(X, verbose=0)
        predicted_class_index = np.argmax(prediction)
        prediction_confidence = prediction[0][predicted_class_index]
        current_prediction = label_encoder.inverse_transform([predicted_class_index])[0]
        
        display_text = f"Prediction: {current_prediction} ({prediction_confidence:.2f})"

    # --- Display Prediction ---
    cv2.putText(image, display_text, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)
    cv2.imshow('SignTalk - Real-Time SIBI/BISINDO Translator', image)

    if cv2.waitKey(5) & 0xFF == ord('q'):
        break

hands.close()
cap.release()
cv2.destroyAllWindows()
print("Application closed.")
