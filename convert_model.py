import tensorflow as tf
import tensorflowjs as tfjs

# Load the Keras model
model = tf.keras.models.load_model('model/gesture_classifier.keras')

# Convert the model
tfjs.converters.save_keras_model(model, 'web/model')
print("Model converted and saved to web/model")
