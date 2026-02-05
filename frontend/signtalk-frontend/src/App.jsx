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
            <section className="card translator-section">
              <h2>📹 Deteksi Gesture</h2>
              <Translator setResult={setResult} />
            </section>

            <section className="card result-section">
              <h2>📝 Hasil Terjemahan</h2>
              <ResultBox text={result} />
            </section>
          </>
        ) : (
          <section className="card text-to-sign-section">
            <h2>✋ Text to Sign</h2>
            <TextToSign />
          </section>
        )}
      </main>


      <footer className="app-footer">
        <p>💡 Tips: {mode === "sign-to-text" ? "Posisikan tangan Anda di depan kamera untuk hasil optimal" : "Ketik teks untuk melihat gesture yang sesuai"}</p>
      </footer>
    </div>
  );
}

export default App;
