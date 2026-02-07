import { useState } from "react";
import "./resultBox.css";

const ResultBox = ({ text }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [historyResults, setHistoryResults] = useState([]);

  // Extract label and confidence from text like "A (85.5%)"
  const parseResult = (resultText) => {
    const match = resultText.match(/^(.+?)\s\((\d+\.\d+)%\)$/);
    if (match) {
      return {
        label: match[1],
        confidence: parseFloat(match[2]) / 100
      };
    }
    return {
      label: resultText,
      confidence: 0
    };
  };

  const speak = () => {
    if (!text) return;

    const { label } = parseResult(text);
    setIsSpeaking(true);

    const utterance = new SpeechSynthesisUtterance(label);
    utterance.lang = "id-ID";
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  // Add to history when text changes (debounce to avoid duplicates)
  if (text && (historyResults.length === 0 || historyResults[0].text !== text)) {
    const newResult = { text, timestamp: new Date().toLocaleTimeString() };
    setHistoryResults(prev => [newResult, ...prev.slice(0, 4)]);
  }

  if (!text) {
    return (
      <div className="result-container empty">
        <div className="result-placeholder">
          <h2>⏳ Menunggu deteksi tangan...</h2>
          <p>Tunjukkan tangan Anda ke kamera untuk mulai</p>
        </div>
      </div>
    );
  }

  const { label, confidence } = parseResult(text);
  const confidencePercent = Math.round(confidence * 100);

  return (
    <div className="result-container">
      {/* Main Result Display */}
      <div className="result-main">
        <div className="gesture-label-large">{label}</div>
        <div className="confidence-section">
          <div className="confidence-bar-container">
            <div
              className="confidence-bar-fill"
              style={{
                width: `${confidencePercent}%`,
                backgroundColor: getConfidenceColor(confidencePercent)
              }}
            />
          </div>
          <div className="confidence-text">
            Keyakinan: <strong>{confidencePercent}%</strong>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="result-actions">
        <button
          onClick={speak}
          disabled={isSpeaking}
          className={`btn-speak ${isSpeaking ? "speaking" : ""}`}
        >
          {isSpeaking ? "🔊 Sedang memutar..." : "🔊 Putar Suara"}
        </button>
        <button
          onClick={() => navigator.clipboard.writeText(label)}
          className="btn-copy"
          title="Salin ke clipboard"
        >
          📋 Salin
        </button>
      </div>

      {/* History */}
      {historyResults.length > 1 && (
        <div className="result-history">
          <h3>📜 Riwayat Terakhir</h3>
          <ul>
            {historyResults.slice(1).map((result, idx) => (
              <li key={idx}>
                <span className="history-label">{parseResult(result.text).label}</span>
                <span className="history-time">{result.timestamp}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Helper function to determine confidence color
const getConfidenceColor = (percent) => {
  if (percent >= 80) return "var(--st-secondary)";
  if (percent >= 60) return "var(--st-accent)";
  if (percent >= 40) return "#ea580c";
  return "var(--st-error)";
};

export default ResultBox;
