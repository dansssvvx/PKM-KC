import { useState } from "react";
import "./AdminLogin.css";

const API_URL = "http://localhost:5000";

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Save token to localStorage
        localStorage.setItem("admin_token", data.token);
        localStorage.setItem("admin_username", username);
        onLogin(data.token);
      } else {
        setError(data.error || "Username atau password salah");
      }
    } catch (err) {
      setError("Gagal terhubung ke server. Pastikan backend berjalan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="login-card">
        <div className="login-header">
          <h2>🔐 Login Admin</h2>
          <p>Masuk untuk mengakses panel admin dataset</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
              required
              autoComplete="username"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              required
              autoComplete="current-password"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="login-error">
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            className="btn-login"
            disabled={loading || !username || !password}
          >
            {loading ? "⏳ Memproses..." : "🔓 Masuk"}
          </button>
        </form>

        <div className="login-footer">
          <small>Hanya untuk administrator yang berwenang</small>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
