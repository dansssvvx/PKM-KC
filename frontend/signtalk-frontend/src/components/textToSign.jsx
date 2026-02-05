import { useState } from "react";
import { GESTURE_LABELS } from "../constants/gestures";
import "./textToSign.css";

const TextToSign = () => {
  const [inputText, inputSetText] = useState("");
  const [selectedGestures, setSelectedGestures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [gestureLists, setGestureLists] = useState([]);
  const [mode, setMode] = useState("word"); // "word" or "char"

  // Convert text to individual signs (per word or per character)
  const handleConvertText = async () => {
    if (!inputText.trim()) {
      setError("Masukkan teks terlebih dahulu");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let items;

      if (mode === "word") {
        // Split text into words (separated by spaces)
        items = inputText.trim().split(/\s+/); // Handles multiple spaces
      } else {
        // Split text into characters
        items = inputText.toUpperCase().split("").filter((char) => char !== " ");
      }

      const mappedGestures = items.map((item) => ({
        text: item.toUpperCase(),
        // Placeholder untuk gesture data - nanti bisa connect ke server
        videoUrl: `/gestures/${item.toUpperCase()}.mp4`,
        label: getGestureLabel(item.toUpperCase()),
      }));

      setSelectedGestures(mappedGestures);
      setGestureLists(mappedGestures);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Get label untuk gesture dari constants
  const getGestureLabel = (char) => {
    return GESTURE_LABELS[char] || char;
  };

  const handlePlaySequence = async () => {
    if (selectedGestures.length === 0) return;

    // Simulate video playback sequence
    for (let gesture of selectedGestures) {
      // Play video atau animasi gesture
      console.log(`Playing gesture: ${gesture.text}`);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1s per gesture
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
              setSelectedGestures([]);
              setError(null);
            }}
          >
            📝 Per Kata
          </button>
          <button
            className={`mode-btn ${mode === "char" ? "active" : ""}`}
            onClick={() => {
              setMode("char");
              setSelectedGestures([]);
              setError(null);
            }}
          >
            🔤 Per Huruf
          </button>
        </div>
      </div>

      {/* Input Section */}
      <div className="input-section">
        <label htmlFor="text-input">📝 Masukkan Teks:</label>
        <textarea
          id="text-input"
          value={inputText}
          onChange={(e) => inputSetText(e.target.value)}
          placeholder="Ketik teks yang ingin diterjemahkan ke gesture..."
          rows="4"
          className="text-input"
        />
        <button
          onClick={handleConvertText}
          disabled={loading || !inputText.trim()}
          className="btn-convert"
        >
          {loading ? "⏳ Memproses..." : "✨ Konversi ke Gesture"}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Gesture Preview Section */}
      {selectedGestures.length > 0 && (
        <div className="gesture-preview-section">
          <h3>
            🎬 Pratinjau Gesture ({selectedGestures.length}{" "}
            {mode === "word" ? "kata" : "huruf"})
          </h3>

          {/* Gesture Grid */}
          <div className="gesture-grid">
            {selectedGestures.map((gesture, idx) => (
              <div key={idx} className="gesture-card">
                <div className="gesture-char">{gesture.text}</div>
                <div className="gesture-label">{gesture.label}</div>
                <div className="gesture-placeholder">
                  📹 Video Gesture
                </div>
              </div>
            ))}
          </div>

          {/* Play Button */}
          <button onClick={handlePlaySequence} className="btn-play">
            ▶️ Putar Animasi
          </button>

          {/* Transcription Display */}
          <div className="transcription-box">
            <h4>📋 Teks Asli:</h4>
            <p className="transcription-text">{inputText}</p>
          </div>
        </div>
      )}

      {/* Help Text */}
      {selectedGestures.length === 0 && !error && (
        <div className="help-section">
          <h3>ℹ️ Cara Menggunakan:</h3>
          <ol>
            <li>Ketik teks/kalimat yang ingin diterjemahkan</li>
            <li>Klik "✨ Konversi ke Gesture"</li>
            <li>Lihat pratinjau gesture untuk setiap kata</li>
            <li>Klik "▶️ Putar Animasi" untuk melihat sequence</li>
          </ol>
        </div>
      )}
    </div>
  );
};

export default TextToSign;
