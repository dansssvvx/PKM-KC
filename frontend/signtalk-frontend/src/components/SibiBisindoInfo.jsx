import "./SibiBisindoInfo.css";

const SibiBisindoInfo = () => {
  return (
    <div className="sibi-bisindo-info">
      <div className="info-intro">
        <h2 className="info-title">
          <span className="info-title-icon" aria-hidden>👋</span>
          Mengenal Bahasa Isyarat di Indonesia
        </h2>
        <p className="info-lead">
          Indonesia memiliki dua sistem bahasa isyarat yang penting untuk komunikasi inklusif. Kenali perbedaannya agar kita bisa mendukung aksesibilitas bagi komunitas Tuli.
        </p>
      </div>

      <div className="info-cards">
        <article className="info-card info-card-sibi">
          <div className="info-card-header">
            <span className="info-card-icon" aria-hidden>📚</span>
            <h3>SIBI</h3>
            <p className="info-card-subtitle">Sistem Isyarat Bahasa Indonesia</p>
          </div>
          <div className="info-card-body">
            <p>
              SIBI adalah sistem bahasa isyarat yang dibakukan oleh pemerintah Indonesia. Dirancang agar selaras dengan tata bahasa Indonesia lisan, sehingga sering digunakan di lingkungan pendidikan formal (misalnya SLB) dan acara resmi.
            </p>
            <ul className="info-list">
              <li>Struktur mengikuti kaidah bahasa Indonesia</li>
              <li>Digunakan sebagai bahasa pengantar di sekolah</li>
              <li>Gerakan cenderung satu tangan, lebih baku</li>
            </ul>
          </div>
        </article>

        <article className="info-card info-card-bisindo">
          <div className="info-card-header">
            <span className="info-card-icon" aria-hidden>🤟</span>
            <h3>BISINDO</h3>
            <p className="info-card-subtitle">Bahasa Isyarat Indonesia</p>
          </div>
          <div className="info-card-body">
            <p>
              BISINDO tumbuh alami dari komunitas Tuli Indonesia. Bahasa ini lebih fleksibel dan ekspresif, serta memiliki banyak variasi daerah (dialek), sehingga sering dipakai dalam percakapan sehari-hari.
            </p>
            <ul className="info-list">
              <li>Berkembang alami dari komunitas Tuli</li>
              <li>Banyak variasi daerah (Jawa, Bali, Sumatera, dll.)</li>
              <li>Gerakan dua tangan, lebih dinamis</li>
            </ul>
          </div>
        </article>
      </div>

      <div className="info-footer-note">
        <p>
          <strong>SignTalk</strong> mendukung pembelajaran dan terjemahan gesture dari kedua sistem ini, sehingga Anda bisa berlatih dan berkomunikasi dengan lebih inklusif.
        </p>
      </div>
    </div>
  );
};

export default SibiBisindoInfo;
