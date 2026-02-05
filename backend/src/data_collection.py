import cv2
import mediapipe as mp
import numpy as np
import sys
import os
import csv

# --- Configuration ---
DATA_PATH = os.path.join('data', '01_processed', 'landmarks.csv')
# 21 landmarks per hand, 3 coordinates (x, y, z), for 2 hands
NUM_FEATURES = 21 * 3 * 2 

# --- MediaPipe Initialization ---
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(
    static_image_mode=False,
    max_num_hands=2, # Changed to detect two hands
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5
)
mp_drawing = mp.solutions.drawing_utils

def get_gesture_label():
    """Gets the gesture label from command-line arguments."""
    if len(sys.argv) < 2:
        print("Usage: python src/data_collection.py <gesture_label>")
        print("Example: python src/data_collection.py A")
        sys.exit(1)
    return sys.argv[1].upper()

def extract_landmarks(hand_landmarks):
    """Extracts and flattens landmarks from a single hand."""
    return np.array([[lm.x, lm.y, lm.z] for lm in hand_landmarks.landmark]).flatten()

def main():
    """Main data collection loop."""
    label = get_gesture_label()
    cap = cv2.VideoCapture(0)

    if not cap.isOpened():
        print("Error: Could not open webcam.")
        exit()

    print(f"Collecting data for gesture: '{label}'")
    print("Position your hand(s) in the frame and press 's' to save the landmarks.")
    print("Press 'q' to quit.")

    while cap.isOpened():
        success, image = cap.read()
        if not success:
            print("Ignoring empty camera frame.")
            continue

        image = cv2.flip(image, 1)
        rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        results = hands.process(rgb_image)

        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                mp_drawing.draw_landmarks(
                    image,
                    hand_landmarks,
                    mp_hands.HAND_CONNECTIONS
                )

        cv2.putText(image, f"Collecting for: {label}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2, cv2.LINE_AA)
        cv2.putText(image, "Press 's' to save, 'q' to quit", (10, 70), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)
        cv2.imshow('Data Collection', image)

        key = cv2.waitKey(5) & 0xFF
        if key == ord('q'):
            break
        if key == ord('s'):
            if results.multi_hand_landmarks:
                landmarks_to_save = np.zeros(NUM_FEATURES)
                
                # We assume the first hand detected is the 'primary' one for ordering
                if len(results.multi_hand_landmarks) == 2:
                    # Ideal case: two hands detected
                    hand1_landmarks = extract_landmarks(results.multi_hand_landmarks[0])
                    hand2_landmarks = extract_landmarks(results.multi_hand_landmarks[1])
                    landmarks_to_save = np.concatenate([hand1_landmarks, hand2_landmarks])
                elif len(results.multi_hand_landmarks) == 1:
                    # One hand detected, pad the other with zeros
                    hand1_landmarks = extract_landmarks(results.multi_hand_landmarks[0])
                    # The rest of landmarks_to_save is already zeros
                    landmarks_to_save[:len(hand1_landmarks)] = hand1_landmarks

                row_to_save = np.append(landmarks_to_save, label)

                with open(DATA_PATH, 'a', newline='') as f:
                    writer = csv.writer(f)
                    writer.writerow(row_to_save)
                print(f"Saved {len(results.multi_hand_landmarks)} hand(s) for '{label}'")
            else:
                print("No hands detected. Please make sure your hands are visible.")

    cap.release()
    cv2.destroyAllWindows()
    hands.close()
    print("Data collection stopped.")

if __name__ == '__main__':
    main()