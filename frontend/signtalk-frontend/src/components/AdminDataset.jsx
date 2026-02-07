import { useState, useRef, useEffect } from "react";
import HandDetector from "./handDetector";
import { buildTwoHandFeatures } from "../services/api";
import "./AdminDataset.css";

const API_URL = "http://localhost:5000";
// const token = localStorage.getItem("admin_token");

const AdminDataset = ({ token, onLogout }) => {
  const [label, setLabel] = useState("");
  const [handsDetected, setHandsDetected] = useState(0);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [datasetStats, setDatasetStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(false);
  const lastLandmarksRef = useRef(null);

  useEffect(() => {
    loadDatasetStats();
  }, []);

  const loadDatasetStats = async () => {
    setLoadingStats(true);
    try {
      const response = await fetch(`${API_URL}/dataset/stats`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      if (response.ok) {
        const data = await response.json();
        setDatasetStats(data);
      } else if (response.status === 401) {
        // Unauthorized - logout
        onLogout();
      }
    } catch (err) {
      console.error("Failed to load stats:", err);
    } finally {
      setLoadingStats(false);
    }
  };

  const handleLandmarksDetected = (multiHandLandmarks) => {
    if (multiHandLandmarks && multiHandLandmarks.length > 0) {
      const landmarks = buildTwoHandFeatures(multiHandLandmarks);
      lastLandmarksRef.current = landmarks;
    }
  };

  const handleSave = async () => {
    if (!label.trim()) {
      setMessage({ type: "error", text: "Masukkan label gesture terlebih dahulu" });
      return;
    }

    if (!lastLandmarksRef.current) {
      setMessage({ type: "error", text: "Tidak ada gesture terdeteksi. Posisikan tangan di depan kamera." });
      return;
    }

    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch(`${API_URL}/dataset/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          landmarks: lastLandmarksRef.current,
          label: label.trim().toUpperCase()
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: `Data berhasil disimpan untuk label "${label.toUpperCase()}"` });
        setLabel("");
        lastLandmarksRef.current = null;
        loadDatasetStats();
      } else if (response.status === 401) {
        onLogout();
        setMessage({ type: "error", text: "Session expired. Silakan login kembali." });
      } else {
        setMessage({ type: "error", text: data.error || "Gagal menyimpan data" });
      }
    } catch (err) {
      setMessage({ type: "error", text: `Error: ${err.message}` });
    } finally {
      setSaving(false);
    }
  };

  const handleTrainModel = async () => {
    if (!window.confirm("Melatih model akan memakan waktu beberapa menit. Lanjutkan?")) {
      return;
    }

    setMessage({ type: "info", text: "Melatih model... Ini mungkin memakan waktu beberapa menit." });

    try {
      const response = await fetch(`${API_URL}/dataset/train`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: `Model berhasil dilatih! Akurasi: ${(data.accuracy * 100).toFixed(2)}%` });
        loadDatasetStats();
      } else if (response.status === 401) {
        onLogout();
        setMessage({ type: "error", text: "Session expired. Silakan login kembali." });
      } else {
        setMessage({ type: "error", text: data.error || "Gagal melatih model" });
      }
    } catch (err) {
      setMessage({ type: "error", text: `Error: ${err.message}` });
    }
  };

  const handleLogout = () => {
    if (window.confirm("Yakin ingin keluar?")) {
      onLogout();
    }
  };

  return (
    <div className="admin-dataset">
      <div className="admin-header">
        <div className="admin-header-content">
          <div>
            <h2>📊 Admin Dataset</h2>
            <p>Tambahkan data gesture baru untuk melatih model</p>
          </div>
          <button onClick={handleLogout} className="btn-logout">
            🚪 Keluar
          </button>
        </div>
      </div>

      <div className="admin-grid">
        <section className="admin-card admin-collect">
          <h3>📥 Koleksi Data</h3>
          
          <div className="form-group">
            <label htmlFor="gesture-label">Label Gesture:</label>
            <input
              id="gesture-label"
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Contoh: A, B, HALO, NAMA"
              className="label-input"
              maxLength={20}
            />
            <small>Masukkan label untuk gesture (huruf atau kata)</small>
          </div>

          <div className="camera-preview-section">
            <h4>Pratinjau Kamera</h4>
            <HandDetector 
              onLandmarksDetected={handleLandmarksDetected}
              onHandsFound={setHandsDetected}
            />
            <div className="hands-status">
              {handsDetected === 0 ? (
                <span className="status-warning">⚠️ Tidak ada tangan terdeteksi</span>
              ) : (
                <span className="status-success">✓ {handsDetected} tangan terdeteksi</span>
              )}
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saving || !label.trim() || handsDetected === 0}
            className="btn-save"
          >
            {saving ? "⏳ Menyimpan..." : "💾 Simpan Data"}
          </button>

          {message.text && (
            <div className={`message message-${message.type}`}>
              {message.text}
            </div>
          )}
        </section>

        <section className="admin-card admin-stats">
          <h3>📈 Statistik Dataset</h3>
          
          {loadingStats ? (
            <div className="loading-stats">Memuat statistik...</div>
          ) : datasetStats ? (
            <>
              <div className="stat-item">
                <span className="stat-label">Total Data:</span>
                <span className="stat-value">{datasetStats.total_samples || 0}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Jumlah Label:</span>
                <span className="stat-value">{datasetStats.num_labels || 0}</span>
              </div>
              
              {datasetStats.label_counts && Object.keys(datasetStats.label_counts).length > 0 && (
                <div className="label-breakdown">
                  <h4>Distribusi Label:</h4>
                  <div className="label-list">
                    {Object.entries(datasetStats.label_counts)
                      .sort((a, b) => b[1] - a[1])
                      .map(([lbl, count]) => (
                        <div key={lbl} className="label-item">
                          <span className="label-name">{lbl}</span>
                          <span className="label-count">{count}</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              <button
                onClick={loadDatasetStats}
                className="btn-refresh"
              >
                🔄 Refresh
              </button>
            </>
          ) : (
            <div className="no-stats">Tidak ada data</div>
          )}

          <div className="train-section">
            <h4>Pelatihan Model</h4>
            <p className="train-description">
              Setelah menambahkan data, latih ulang model untuk meningkatkan akurasi.
            </p>
            <button
              onClick={handleTrainModel}
              className="btn-train"
              disabled={!datasetStats || datasetStats.total_samples === 0}
            >
              🎯 Latih Model
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDataset;