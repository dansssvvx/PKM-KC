import { useState } from "react";
import Translator from "./components/translator";
import ResultBox from "./components/resultBox";
import ModeSelector from "./components/modeSelector";
import TextToSign from "./components/textToSign";
import "./App.css";

function App() {
  const [result, setResult] = useState("");
  const [mode, setMode] = useState("sign-to-text"); // "sign-to-text" or "text-to-sign"

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🤟 SignTalk</h1>
        <p>Real-Time Gesture Translator | SIBI/BISINDO</p>
      </header>

      {/* Mode Selector */}
      <ModeSelector mode={mode} onModeChange={setMode} />

      <main className="app-main">
        {mode === "sign-to-text" ? (
          <>
            {/* Sign to Text Mode */}
            <div className="translator-section">
              <h2>📹 Detektor Gesture</h2>
              <Translator setResult={setResult} />
            </div>

            <div className="result-section">
              <ResultBox text={result} />
            </div>
          </>
        ) : (
          <>
            {/* Text to Sign Mode */}
            <div className="text-to-sign-section">
              <TextToSign />
            </div>
          </>
        )}
      </main>

      <footer className="app-footer">
        <p>💡 Tips: {mode === "sign-to-text" ? "Posisikan tangan Anda di depan kamera untuk hasil optimal" : "Ketik teks untuk melihat gesture yang sesuai"}</p>
      </footer>
    </div>
  );
}

export default App;
