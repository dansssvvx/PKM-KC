import { useEffect, useRef, useState } from "react";

const HandDetector = ({ onLandmarksDetected, onHandsFound }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const offscreenCanvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const lastFrameTimeRef = useRef(0);
  const FRAME_SKIP_MS = 66; // ~15 FPS cap to reduce flicker

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;

    // Create offscreen canvas for double buffering
    offscreenCanvasRef.current = document.createElement("canvas");
    offscreenCanvasRef.current.width = 640;
    offscreenCanvasRef.current.height = 480;

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
      try {
        const offscreenCtx = offscreenCanvasRef.current.getContext("2d");
        
        // Clear offscreen canvas
        offscreenCtx.clearRect(0, 0, offscreenCanvasRef.current.width, offscreenCanvasRef.current.height);

        // Draw video frame to offscreen canvas
        offscreenCtx.drawImage(video, 0, 0, offscreenCanvasRef.current.width, offscreenCanvasRef.current.height);

        // Draw landmarks if detected
        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
          for (let i = 0; i < results.multiHandLandmarks.length; i++) {
            const landmarks = results.multiHandLandmarks[i];
            if (window.drawConnectors) {
              window.drawConnectors(offscreenCtx, landmarks, window.HAND_CONNECTIONS, {
                color: "#00FF00",
                lineWidth: 5
              });
            }
            if (window.drawLandmarks) {
              window.drawLandmarks(offscreenCtx, landmarks, {
                color: "#FF0000",
                radius: 6
              });
            }
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

        // Copy offscreen canvas to display canvas (atomic operation)
        const displayCtx = canvas.getContext("2d");
        displayCtx.drawImage(offscreenCanvasRef.current, 0, 0);
      } catch (e) {
        console.error("Canvas render error:", e);
      }
    });

    // Initialize camera with frame skip control
    const camera = new window.Camera(video, {
      onFrame: async () => {
        const now = Date.now();
        if (now - lastFrameTimeRef.current < FRAME_SKIP_MS) {
          return; // Skip frame to reduce processing load
        }
        lastFrameTimeRef.current = now;

        if (canvas.width === 0) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          offscreenCanvasRef.current.width = video.videoWidth;
          offscreenCanvasRef.current.height = video.videoHeight;
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
          maxWidth: "640px",
          backgroundColor: "#000"
        }}
      />
      {loading && <div style={{ color: "#999", textAlign: "center" }}>⏳ Loading camera...</div>}
    </div>
  );
};

export default HandDetector;
