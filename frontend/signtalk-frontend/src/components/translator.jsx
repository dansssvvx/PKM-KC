import { useState, useRef } from "react";
import HandDetector from "./handDetector";
import { sendLandmarks, buildTwoHandFeatures } from "../services/api";
import "./translator.css";

const Translator = ({ setResult }) => {
  const [handsDetected, setHandsDetected] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const lastSendTimeRef = useRef(0);
  const SEND_INTERVAL_MS = 500; // Send landmarks every 500ms max

  const handleLandmarksDetected = async (multiHandLandmarks) => {
    const now = Date.now();
    if (now - lastSendTimeRef.current < SEND_INTERVAL_MS) {
      return;
    }
    lastSendTimeRef.current = now;

    try {
      setLoading(true);
      setError(null);

      // Build 126-feature vector from landmarks
      const landmarks = buildTwoHandFeatures(multiHandLandmarks);

      // Send to server
      const result = await sendLandmarks(landmarks);

      if (result.label) {
        setResult(`${result.label} (${(result.confidence * 100).toFixed(1)}%)`);
      } else if (result.error) {
        setError(`Prediction error: ${result.error}`);
      }
    } catch (err) {
      setError(err.message);
      console.error("Prediction error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="translator-wrap">
      <HandDetector onLandmarksDetected={handleLandmarksDetected} onHandsFound={setHandsDetected} />
      <div className="translator-status">
        <span className={handsDetected > 0 ? "hands" : ""}>
          {handsDetected === 0 ? "🖐️ Tidak ada tangan terdeteksi" : `🖐️ Tangan terdeteksi: ${handsDetected}`}
        </span>
        {loading && <span className="loading">📤 Mengirim...</span>}
      </div>
      {error && <div className="translator-error">⚠️ {error}</div>}
    </div>
  );
};

export default Translator;

