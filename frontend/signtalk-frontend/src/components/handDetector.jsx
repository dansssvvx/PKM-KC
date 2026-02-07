import { useEffect, useRef, useState } from "react";
import "./handDetector.css";

const HandDetector = ({ onLandmarksDetected, onHandsFound }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const offscreenCanvasRef = useRef(null);

  const handsRef = useRef(null);
  const cameraRef = useRef(null);
  const isActiveRef = useRef(true);

  const lastFrameTimeRef = useRef(0);
  const FRAME_SKIP_MS = 66; // ~15 FPS

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    isActiveRef.current = true;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    // === OFFSCREEN CANVAS ===
    offscreenCanvasRef.current = document.createElement("canvas");
    offscreenCanvasRef.current.width = 640;
    offscreenCanvasRef.current.height = 480;

    // === MEDIAPIPE HANDS INIT ===
    handsRef.current = new window.Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    handsRef.current.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });

    handsRef.current.onResults((results) => {
      if (!isActiveRef.current) return;

      try {
        const offscreenCtx = offscreenCanvasRef.current.getContext("2d");

        offscreenCtx.clearRect(
          0,
          0,
          offscreenCanvasRef.current.width,
          offscreenCanvasRef.current.height
        );

        offscreenCtx.drawImage(
          video,
          0,
          0,
          offscreenCanvasRef.current.width,
          offscreenCanvasRef.current.height
        );

        if (results.multiHandLandmarks?.length) {
          results.multiHandLandmarks.forEach((landmarks) => {
            window.drawConnectors?.(
              offscreenCtx,
              landmarks,
              window.HAND_CONNECTIONS,
              { color: "#00FF00", lineWidth: 5 }
            );
            window.drawLandmarks?.(offscreenCtx, landmarks, {
              color: "#FF0000",
              radius: 6,
            });
          });

          onLandmarksDetected?.(results.multiHandLandmarks);
          onHandsFound?.(results.multiHandLandmarks.length);
        } else {
          onHandsFound?.(0);
        }

        const displayCtx = canvas.getContext("2d");
        displayCtx.drawImage(offscreenCanvasRef.current, 0, 0);
      } catch (err) {
        console.error("Render error:", err);
      }
    });

    // === CAMERA INIT ===
    cameraRef.current = new window.Camera(video, {
      onFrame: async () => {
        if (!handsRef.current || !isActiveRef.current) return;

        const now = Date.now();
        if (now - lastFrameTimeRef.current < FRAME_SKIP_MS) return;
        lastFrameTimeRef.current = now;

        await handsRef.current.send({ image: video });
      },
      width: 640,
      height: 480,
    });

    cameraRef.current
      .start()
      .then(() => setLoading(false))
      .catch((err) => {
        setError(`Camera error: ${err.message}`);
        setLoading(false);
        console.error(err);
      });

    // === CLEANUP ===
    return () => {
      isActiveRef.current = false;

      try {
        cameraRef.current?.stop();
        handsRef.current?.close();
      } catch (e) {
        console.warn("Cleanup error:", e);
      }

      cameraRef.current = null;
      handsRef.current = null;
    };
  }, []);

  if (error) {
    return <div className="hand-detector-error">❌ {error}</div>;
  }

  return (
    <div className="hand-detector-wrap">
      <video ref={videoRef} autoPlay playsInline style={{ display: "none" }} />
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{
          display: loading ? "none" : "block",
          backgroundColor: "#0f172a",
        }}
      />
      {loading && (
        <div className="hand-detector-loading">⏳ Memuat kamera...</div>
      )}
    </div>
  );
};

export default HandDetector;
