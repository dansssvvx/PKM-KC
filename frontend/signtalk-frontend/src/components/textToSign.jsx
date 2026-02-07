import { useState, useRef } from "react";
import { GESTURE_LABELS } from "../constants/gestures";
import "./textToSign.css";

/* =======================
   Helper Functions
======================= */

// Normalisasi teks → nama file
const normalizeText = (text) =>
  text.toUpperCase().trim().replace(/\s+/g, "_");

// Ambil label gesture
const getGestureLabel = (key) => GESTURE_LABELS[key] || key;

// Generate gesture list
const mapTextToGestures = (text, mode) => {
  if (!text.trim()) return [];

  if (mode === "word") {
    const key = normalizeText(text);
    return [{
          text: key,
          label: getGestureLabel(key),
          videoUrl: `/gestures/videos/${key}.mp4`,
          imageUrl: `/gestures/images/${key}.jpg`,
        },
    ];
  }

  // mode === "char"
  return normalizeText(text)
    .replace(/_/g, "")
    .split("")
    .map((char) => ({
      text: char,
      label: getGestureLabel(char),
      imageUrl: `/gestures/images/${char}.jpg`,
    }));
};

/* =======================
   Component
======================= */

const TextToSign = () => {
  const [inputText, setInputText] = useState("");
  const [gestures, setGestures] = useState([]);
  const [mode, setMode] = useState("word");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const videoError = useState(false);
  // const videoRef = useRef(null);
  const videoRef = useRef([]);




  const handleConvertText = async () => {
    if (!inputText.trim()) {
      setError("Masukkan teks terlebih dahulu");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const mappedGestures = mapTextToGestures(inputText, mode);
      console.log("TEXT:", inputText);
console.log("RESULT:", mappedGestures);
      setGestures(mappedGestures);
    } catch (err) {
      setError("Terjadi kesalahan saat memproses teks");
    } finally {
      setLoading(false);
    }
  };

  // const handlePlaySequence = async () => {
  //   if (!gestures.length) return;

  //   for (const gesture of gestures) {
  //     console.log(`Playing gesture: ${gesture.text}`);
  //     await new Promise((resolve) => setTimeout(resolve, 800));
  //   }
  // };

const handlePlaySequence = async () => {
  for (const video of videoRef.current) {
    if (!video) continue;

    video.currentTime = 0;
    await video.play();

    await new Promise((resolve) =>
      video.onended = resolve
    );
  }
};



  return (
    <div className="text-to-sign-container">
      {/* Mode Selector */}
      <div className="mode-selector">
        <label>🎯 Pilih Mode:</label>
        <div className="mode-buttons">
          <button
            className={`mode-btn ${mode === "word" ? "active" : ""}`}
            onClick={() => {
              setMode("word");
              setGestures([]);
              setError(null);
            }}
          >
            📝 Per Kata
          </button>
          <button
            className={`mode-btn ${mode === "char" ? "active" : ""}`}
            onClick={() => {
              setMode("char");
              setGestures([]);
              setError(null);
            }}
          >
            🔤 Per Huruf
          </button>
        </div>
      </div>

      {/* Input */}
      <div className="input-section">
        <label htmlFor="text-input">📝 Masukkan Teks:</label>
        <textarea
          id="text-input"
          className="text-input"
          rows="4"
          placeholder="Ketik teks yang ingin diterjemahkan..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          className="btn-convert"
          onClick={handleConvertText}
          disabled={loading || !inputText.trim()}
        >
          {loading ? "⏳ Memproses..." : "✨ Konversi ke Gesture"}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Gesture Preview */}
      {gestures.length > 0 && (
        <div className="gesture-preview-section">
          <h3>
            🎬 Pratinjau Gesture ({gestures.length}{" "}
            {mode === "word" ? "kata" : "huruf"})
          </h3>

          <div className="gesture-grid">
            {gestures.map((gesture, index) => (
              <div key={gesture.videoUrl} className={`gesture-card ${
    gesture.videoUrl && !videoError ? "video-card" : ""
  }`}>
                <div className="gesture-char">{gesture.text}</div>
                {/* <div className="gesture-label">{gesture.label}</div> */}
                <div className="gesture-image-wrapper">
  {gesture.videoUrl ? (
    <video
      key={gesture.videoUrl}
      ref={(el) => (videoRef.current[index] = el)}
      src={gesture.videoUrl}
      className="gesture-video video-large"
      controls
      muted
      playsInline
      preload="metadata"
    >
      <source src={gesture.videoUrl} type="video/mp4" />
    </video>
  ) : (
    <img
      src={gesture.imageUrl}
      alt={gesture.label}
      className="gesture-image"
    />
  )}
</div>



              </div>
            ))}
          </div>

          <button className="btn-play" onClick={handlePlaySequence}>
            ▶️ Putar Animasi
          </button>

          <div className="transcription-box">
            <h4>📋 Teks Asli:</h4>
            <p className="transcription-text">{inputText}</p>
          </div>
        </div>
      )}

      {/* Help */}
      {gestures.length === 0 && !error && (
        <div className="help-section">
          <h3>ℹ️ Cara Menggunakan:</h3>
          <ol>
            <li>Ketik teks atau kalimat</li>
            <li>Pilih mode kata atau huruf</li>
            <li>Klik konversi</li>
            <li>Lihat hasil gesture</li>
          </ol>
        </div>
      )}
    </div>
  );
};

export default TextToSign;
