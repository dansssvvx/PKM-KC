import { useState } from "react";
import Translator from "./components/translator";
import ResultBox from "./components/resultBox";
import "./App.css";

function App() {
  const [result, setResult] = useState("");

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🤟 SignTalk</h1>
        <p>Real-Time Gesture Translator | SIBI/BISINDO</p>
      </header>

      <main className="app-main">
        <div className="translator-section">
          <h2>📹 Detektor Gesture</h2>
          <Translator setResult={setResult} />
        </div>

        <div className="result-section">
          <ResultBox text={result} />
        </div>
      </main>

      <footer className="app-footer">
        <p>💡 Tips: Posisikan tangan Anda di depan kamera untuk hasil optimal</p>
      </footer>
    </div>
  );
}

export default App;
