import { useState, useEffect } from "react";
import Translator from "./components/translator";
import ResultBox from "./components/resultBox";
import ModeSelector from "./components/modeSelector";
import TextToSign from "./components/textToSign";
import SibiBisindoInfo from "./components/SibiBisindoInfo";
import AdminDataset from "./components/AdminDataset";
import AdminLogin from "./components/AdminLogin";
import "./App.css";

function App() {
  const [result, setResult] = useState("");
  const [mode, setMode] = useState("sign-to-text");
  const [view, setView] = useState("translator"); // "translator" | "info" | "admin"
  const [adminToken, setAdminToken] = useState(null);

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      setAdminToken(token);
    }
  }, []);

  const handleAdminLogin = (token) => {
    setAdminToken(token);
    setView("admin");
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_username");
    setAdminToken(null);
    setView("translator");
  };

  const handleAdminViewClick = () => {
    if (!adminToken) {
      setView("admin"); // Will show login
    } else {
      setView("admin");
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-logo">
          <span className="brand">SignTalk</span>
        </h1>
        <p className="app-tagline">Belajar & terjemah bahasa isyarat · SIBI & BISINDO</p>

        <nav className="app-nav" aria-label="Navigasi utama">
          <button
            className={`nav-btn ${view === "translator" ? "active" : ""}`}
            onClick={() => setView("translator")}
            aria-current={view === "translator" ? "page" : undefined}
          >
            <span className="nav-icon" aria-hidden>✋</span>
            Translator
          </button>
          <button
            className={`nav-btn ${view === "info" ? "active" : ""}`}
            onClick={() => setView("info")}
            aria-current={view === "info" ? "page" : undefined}
          >
            <span className="nav-icon" aria-hidden>📖</span>
            Tentang SIBI & BISINDO
          </button>
          <button
            className={`nav-btn ${view === "admin" ? "active" : ""}`}
            onClick={handleAdminViewClick}
            aria-current={view === "admin" ? "page" : undefined}
          >
            <span className="nav-icon" aria-hidden>⚙️</span>
            Admin Dataset
            {adminToken && <span className="admin-badge" aria-label="Logged in">✓</span>}
          </button>
        </nav>
      </header>

      <main className="app-main" role="main">
        {view === "info" ? (
          <section className="card info-section" aria-labelledby="info-heading">
            <h2 id="info-heading" className="sr-only">Informasi SIBI dan BISINDO</h2>
            <SibiBisindoInfo />
          </section>
        ) : view === "admin" ? (
          adminToken ? (
            <section className="card admin-section" aria-labelledby="admin-heading">
              <h2 id="admin-heading" className="sr-only">Admin Dataset</h2>
              <AdminDataset token={adminToken} onLogout={handleAdminLogout} />
            </section>
          ) : (
            <section className="card admin-section" aria-labelledby="login-heading">
              <h2 id="login-heading" className="sr-only">Admin Login</h2>
              <AdminLogin onLogin={handleAdminLogin} />
            </section>
          )
        ) : (
          <div className="translator-view">
            <div className="mode-bar">
              <ModeSelector mode={mode} onModeChange={setMode} />
            </div>

            {mode === "sign-to-text" ? (
              <div className="translator-grid">
                <section className="card translator-section" aria-labelledby="camera-heading">
                  <h2 id="camera-heading">
                    <span className="icon" aria-hidden>📹</span>
                    Pratinjau Kamera & Deteksi Gesture
                  </h2>
                  <Translator setResult={setResult} />
                </section>
                <section className="card result-section" aria-labelledby="result-heading">
                  <h2 id="result-heading">
                    <span className="icon" aria-hidden>📝</span>
                    Hasil Terjemahan
                  </h2>
                  <ResultBox text={result} />
                </section>
              </div>
            ) : (
              <section className="card text-to-sign-section" aria-labelledby="text-sign-heading">
                <h2 id="text-sign-heading">
                  <span className="icon" aria-hidden>✋</span>
                  Text to Sign
                </h2>
                <TextToSign />
              </section>
            )}
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>
          💡 {view === "translator"
            ? (mode === "sign-to-text"
              ? "Posisikan tangan di depan kamera untuk hasil optimal."
              : "Ketik teks lalu konversi untuk melihat gesture.")
            : view === "info"
            ? "Pelajari perbedaan SIBI dan BISINDO untuk komunikasi yang lebih inklusif."
            : "Tambahkan data gesture baru untuk meningkatkan akurasi model."}
        </p>
      </footer>
    </div>
  );
}

export default App;
