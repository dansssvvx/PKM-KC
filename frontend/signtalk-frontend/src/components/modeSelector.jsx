import "./modeSelector.css";

const ModeSelector = ({ mode, onModeChange }) => {
  return (
    <div className="mode-selector">
      <button
        className={`mode-btn ${mode === "sign-to-text" ? "active" : ""}`}
        onClick={() => onModeChange("sign-to-text")}
        title="Terjemahkan gesture/sign menjadi teks"
      >
        <span className="mode-icon">👋</span>
        <span className="mode-label">Sign to Bahasa</span>
      </button>
      <div className="mode-divider"></div>
      <button
        className={`mode-btn ${mode === "text-to-sign" ? "active" : ""}`}
        onClick={() => onModeChange("text-to-sign")}
        title="Terjemahkan teks menjadi video gesture"
      >
        <span className="mode-icon">📝</span>
        <span className="mode-label">Text to Sign</span>
      </button>
    </div>
  );
};

export default ModeSelector;
