
# SignTalk: Penerjemah Bahasa Isyarat Indonesia (BISINDO)

![SignTalk Demo](https://placehold.co/600x400?text=Tangkapan+Layar+Aplikasi)

## 👋 Tentang Proyek Ini

SignTalk adalah sebuah proyek keren yang dibangun untuk menerjemahkan Bahasa Isyarat Indonesia (BISINDO) secara *real-time* langsung dari kamera laptop/PC. Tujuannya simpel: menjembatani kesenjangan komunikasi antara teman-teman Tuli dan teman-teman dengar, agar interaksi jadi lebih mudah dan seru!

Aplikasi ini bisa mengenali berbagai gestur isyarat dan menampilkannya dalam bentuk teks di layar.

## ✨ Fitur Utama

- **Terjemahan Real-Time**: Langsung menerjemahkan gerakan isyarat dari kamera ke dalam teks.
- **Antarmuka Web Sederhana**: Tampilan yang bersih dan gampang banget buat dipakai. Cukup buka browser, dan aplikasi siap digunakan.
- **Model Deep Learning**: Ditenagai oleh model AI yang dilatih khusus untuk mengenali isyarat BISINDO.
- **Open Source**: Semua kode di proyek ini terbuka, jadi siapa saja bisa ikut belajar dan berkontribusi.

## 🚀 Cara Menjalankan Aplikasi

Penasaran mau coba langsung? Ikuti langkah-langkah ini:

1.  **Clone Repositori**
    ```bash
    git clone https://github.com/username/SignTalk-PKM-KC.git
    cd SignTalk-PKM-KC
    ```

2.  **Siapkan Lingkungan Virtual & Instal Dependensi**
    Pastikan Python sudah terinstal di komputermu.

    ```bash
    # Buat virtual environment
    python -m venv venv

    # Aktifkan
    .\venv\Scripts\activate

    # Install semua library yang dibutuhkan
    pip install -r requirements.txt
    pip install -r requirements-web.txt
    ```

3.  **Jalankan Aplikasi**
    Setelah semua dependensi terinstal, jalankan file `app.py`.

    ```bash
    python src/app.py
    ```

4.  **Buka di Browser**
    Buka browser favoritmu (Chrome, Firefox, dll.) dan akses alamat `http://127.0.0.1:5000` atau alamat lain yang muncul di terminal.

5.  **Selesai!**
    Arahkan kamera ke wajah dan tanganmu, lalu mulailah memperagakan isyarat. Hasil terjemahannya akan langsung muncul di layar!

## 🛠️ Teknologi yang Digunakan

Proyek ini dibangun menggunakan beberapa teknologi dan library keren:

- **Python**: Bahasa pemrograman utama.
- **OpenCV**: Untuk memproses gambar dan video dari kamera.
- **MediaPipe**: Untuk mendeteksi *landmark* (titik-titik kunci) pada tangan dan tubuh.
- **TensorFlow/Keras**: Untuk membangun dan melatih model *deep learning* klasifikasi gestur.
- **Flask**: Sebagai web server untuk backend.
- **Socket.IO**: Untuk komunikasi *real-time* antara server (Python) dan klien (JavaScript).
- **HTML, CSS, JavaScript**: Untuk membangun antarmuka pengguna di sisi browser.

## 📁 Struktur Folder Proyek

Biar nggak bingung, ini penjelasan singkat tentang isi folder proyek:

```
├── data/
│   └── 01_processed/landmarks.csv  # Data hasil ekstraksi landmark untuk training
├── model/
│   ├── gesture_classifier.keras    # Model AI yang sudah dilatih
│   └── label_encoder.pkl           # Encoder untuk label kelas gestur
├── src/
│   ├── app.py                      # File utama untuk menjalankan server Flask
│   ├── data_collection.py          # Skrip untuk mengumpulkan data gestur baru
│   ├── model_training.py           # Skrip untuk melatih model dari awal
│   └── utils.py                    # Fungsi-fungsi bantuan
├── web/
│   ├── index.html                  # Halaman utama aplikasi
│   └── script.js                   # Logika di sisi browser
├── requirements.txt                # Daftar dependensi utama
├── requirements-web.txt            # Daftar dependensi khusus web
└── README.md                       # File yang sedang kamu baca :)
```

---

Semoga proyek ini bermanfaat! Jika ada ide atau masukan, jangan ragu untuk berkontribusi.
