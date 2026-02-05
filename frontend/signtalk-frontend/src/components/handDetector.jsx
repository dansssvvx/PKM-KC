import { useEffect, useRef, useState } from "react";

const HandDetector = ({ onLandmarksDetected, onHandsFound }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;

    // Initialize MediaPipe Hands
    const hands = new window.Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
    });

    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7
    });

    // On detection results
    hands.onResults((results) => {
      const canvasCtx = canvas.getContext("2d");

      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw video frame
      canvasCtx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Draw landmarks if detected
      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        for (let i = 0; i < results.multiHandLandmarks.length; i++) {
          const landmarks = results.multiHandLandmarks[i];
          window.drawConnectors(canvasCtx, landmarks, window.HAND_CONNECTIONS, {
            color: "#00FF00",
            lineWidth: 5
          });
          window.drawLandmarks(canvasCtx, landmarks, {
            color: "#FF0000",
            radius: 6
          });
        }

        // Callback with detected landmarks
        if (onLandmarksDetected) {
          onLandmarksDetected(results.multiHandLandmarks);
        }
        if (onHandsFound) {
          onHandsFound(results.multiHandLandmarks.length);
        }
      } else {
        if (onHandsFound) {
          onHandsFound(0);
        }
      }

      canvasCtx.restore();
    });

    // Initialize camera
    const camera = new window.Camera(video, {
      onFrame: async () => {
        if (canvas.width === 0) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        }
        await hands.send({ image: video });
      },
      width: 640,
      height: 480
    });

    camera
      .start()
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        setError(`Camera error: ${err.message}`);
        setLoading(false);
        console.error(err);
      });

    // Cleanup
    return () => {
      try {
        camera.stop();
        hands.close();
      } catch (e) {
        console.warn("Cleanup error:", e);
      }
    };
  }, [onLandmarksDetected, onHandsFound]);

  if (error) {
    return <div style={{ color: "red" }}>❌ {error}</div>;
  }

  return (
    <div style={{ position: "relative", width: "640px" }}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ display: "none" }}
      />
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{
          borderRadius: "12px",
          border: "2px solid #22c55e",
          display: loading ? "none" : "block",
          width: "100%",
          maxWidth: "640px"
        }}
      />
      {loading && <div style={{ color: "#999", textAlign: "center" }}>⏳ Loading camera...</div>}
    </div>
  );
};

export default HandDetector;
