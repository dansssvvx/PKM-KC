import numpy as np
import pandas as pd
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv1D, MaxPooling1D, Flatten, Dense, Dropout
import pickle
import os

# --- Configuration ---
DATA_PATH = os.path.join('data', '01_processed', 'landmarks.csv')
MODEL_SAVE_PATH = 'model/gesture_classifier.keras'
ENCODER_SAVE_PATH = 'model/label_encoder.pkl'

def load_processed_data():
    """
    Loads processed landmark data and labels from the CSV file.
    
    Returns:
        A tuple of (features, labels).
    """
    if not os.path.exists(DATA_PATH):
        print(f"Error: Data file not found at {DATA_PATH}")
        print("Please run the data collection script first (e.g., python src/data_collection.py A)")
        sys.exit(1)

    print("Loading data from CSV...")
    data = pd.read_csv(DATA_PATH, header=None)
    X = data.iloc[:, :-1].values
    y = data.iloc[:, -1].values
    
    return X, y

def create_model(input_shape, num_classes):
    """
    Creates and compiles the 1D CNN model.
    """
    model = Sequential([
        Conv1D(filters=32, kernel_size=5, activation='relu', input_shape=input_shape),
        MaxPooling1D(pool_size=2),
        Conv1D(filters=64, kernel_size=3, activation='relu'),
        MaxPooling1D(pool_size=2),
        Flatten(),
        Dense(128, activation='relu'),
        Dropout(0.5),
        Dense(num_classes, activation='softmax')
    ])

    model.compile(
        optimizer='adam',
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    return model

def main():
    """
    Main training pipeline.
    """
    # 1. Load Data
    X, y = load_processed_data()
    
    if len(y) == 0:
        print("No data found. Please collect data first.")
        return

    # 2. Preprocess Labels
    # Encode string labels to integers
    label_encoder = LabelEncoder()
    y_encoded = label_encoder.fit_transform(y)
    
    # Dynamically determine the number of classes
    num_classes = len(label_encoder.classes_)
    print(f"Found {num_classes} classes: {label_encoder.classes_}")

    # Convert integers to one-hot vectors
    y_categorical = to_categorical(y_encoded, num_classes=num_classes)

    # 3. Split Data
    # Stratify ensures the class distribution is the same in train and test sets
    X_train, X_test, y_train, y_test = train_test_split(
        X, y_categorical, test_size=0.2, random_state=42, stratify=y_categorical
    )
    
    # 4. Reshape data for Conv1D
    # The model expects input shape: (num_samples, num_features, 1)
    X_train = np.expand_dims(X_train, axis=2)
    X_test = np.expand_dims(X_test, axis=2)
    
    INPUT_SHAPE = X_train.shape[1:]

    # 5. Create and Train Model
    model = create_model(input_shape=INPUT_SHAPE, num_classes=num_classes)
    model.summary()

    print("\nStarting model training...")
    history = model.fit(
        X_train,
        y_train,
        epochs=30, #awalnya 50
        batch_size=32,
        validation_data=(X_test, y_test),
        callbacks=[tf.keras.callbacks.EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True)]
    )
    print("Model training finished.")

    # 6. Evaluate Model
    val_loss, val_accuracy = model.evaluate(X_test, y_test)
    print(f"\nValidation Accuracy: {val_accuracy * 100:.2f}%")
    print(f"Validation Loss: {val_loss:.4f}")

    # 7. Save Model and Label Encoder
    model.save(MODEL_SAVE_PATH)
    print(f"\nModel saved successfully to {MODEL_SAVE_PATH}")
    
    with open(ENCODER_SAVE_PATH, 'wb') as f:
        pickle.dump(label_encoder, f)
    print(f"Label encoder saved successfully to {ENCODER_SAVE_PATH}")

if __name__ == '__main__':
    main()
