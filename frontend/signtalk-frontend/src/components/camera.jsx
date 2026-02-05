import { useEffect, useRef } from "react";

const Camera = ({ videoRef }) => {
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      });
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      width="480"
      height="360"
      style={{ borderRadius: "12px", border: "2px solid #22c55e" }}
    />
  );
};

export default Camera;
