// Gesture Mapping Reference
// Untuk memudahkan management gesture videos

// Single letters (backward compatible)
export const GESTURE_LABELS = {
  A: "A - Tangan menggenggam",
  B: "B - Jari rapat",
  C: "C - Jari bengkok",
  D: "D - Jari telunjuk tegak",
  E: "E - Semua jari tertutup",
  F: "F - Jari terbuka (V shape)",
  G: "G - Jari telunjuk tengah menunjuk",
  H: "H - Dua jari tengah",
  I: "I - Jari kelingking telunjuk",
  J: "J - Jari kelingking bengkok",
  K: "K - Tiga jari",
  L: "L - Thumb & telunjuk",
  M: "M - Tiga jari tengah",
  N: "N - Dua jari tengah",
  O: "O - Jari melingkar",
  P: "P - Jari tengah telunjuk",
  Q: "Q - Thumb telunjuk",
  R: "R - Jari tengah & telunjuk silang",
  S: "S - Kepalan tangan",
  T: "T - Thumb diantara jari",
  U: "U - Dua jari tengah terbuka",
  V: "V - V shape dengan dua jari",
  W: "W - Tiga jari terbuka",
  X: "X - Jari silang",
  Y: "Y - Thumb & kelingking terbuka",
  Z: "Z - Gerakan Z dengan telunjuk",
  " ": "SPASI",
  
  // Common Indonesian words
  HALO: "👋 Sapaan - Gerakan tangan ke samping",
  NAMA: "📝 Nama - Tunjuk diri sendiri",
  AKU: "👁️ Aku - Tunjuk ke diri sendiri",
  KAMU: "👉 Kamu - Tunjuk ke orang lain",
  DIA: "👆 Dia - Tunjuk ke belakang",
  KAMI: "🤝 Kami - Gerakan melingkar",
  KALIAN: "👥 Kalian - Tunjuk ke depan",
  MEREKA: "👏 Mereka - Gerakan ke samping",
  
  APA: "❓ Apa - Tanya dengan tangan",
  SIAPA: "❓ Siapa - Tanya dengan jari",
  DIMANA: "🗺️ Dimana - Tunjuk ke berbagai arah",
  KAPAN: "⏰ Kapan - Gerakan memutar",
  MENGAPA: "🤔 Mengapa - Tangan di dagu",
  
  BAIK: "👍 Baik - Jempol ke atas",
  BURUK: "👎 Buruk - Jempol ke bawah",
  BAGUS: "✨ Bagus - Gerakan bersinar",
  JELEK: "😞 Jelek - Gerakan turun",
  
  MAKAN: "🍽️ Makan - Gerakan ke mulut",
  MINUM: "🥤 Minum - Gerakan ke mulut",
  TIDUR: "😴 Tidur - Kepala di tangan",
  JALAN: "🚶 Jalan - Jari jalan",
  LARI: "🏃 Lari - Gerakan cepat",
  
  AYAH: "👨 Ayah - Tunjuk ayah",
  IBU: "👩 Ibu - Tunjuk ibu",
  KAKAK: "👦 Kakak - Gerakan atas",
  ADIK: "👧 Adik - Gerakan bawah",
  ABANG: "💪 Abang - Lengan kuat",
  KAKUQ: "🤦 Kakuq - Kepala berguncang",
  
  SEKOLAH: "📚 Sekolah - Buku terbuka",
  RUMAH: "🏠 Rumah - Atap rumah",
  MOBIL: "🚗 Mobil - Setir kemudi",
  SEPEDA: "🚲 Sepeda - Pedal sepeda",
  
  HARI: "☀️ Hari - Gerakan matahari",
  BULAN: "🌙 Bulan - Gerakan bulan",
  MINGGU: "📅 Minggu - Hitung jari",
  SENIN: "📅 Senin - Hari kerja pertama",
  
  SATU: "1️⃣ Satu - Jari satu",
  DUA: "2️⃣ Dua - Jari dua",
  TIGA: "3️⃣ Tiga - Jari tiga",
  EMPAT: "4️⃣ Empat - Jari empat",
  LIMA: "5️⃣ Lima - Kelima jari",
  ENAM: "6️⃣ Enam - Gerakan enam",
  TUJUH: "7️⃣ Tujuh - Gerakan tujuh",
  DELAPAN: "8️⃣ Delapan - Gerakan delapan",
  SEMBILAN: "9️⃣ Sembilan - Gerakan sembilan",
  SEPULUH: "🔟 Sepuluh - Kedua tangan penuh",
};

// Video file mapping
export const GESTURE_VIDEO_PATHS = {
  // Single letters
  A: "/gestures/A.mp4",
  B: "/gestures/B.mp4",
  C: "/gestures/C.mp4",
  D: "/gestures/D.mp4",
  E: "/gestures/E.mp4",
  F: "/gestures/F.mp4",
  G: "/gestures/G.mp4",
  H: "/gestures/H.mp4",
  I: "/gestures/I.mp4",
  J: "/gestures/J.mp4",
  K: "/gestures/K.mp4",
  L: "/gestures/L.mp4",
  M: "/gestures/M.mp4",
  N: "/gestures/N.mp4",
  O: "/gestures/O.mp4",
  P: "/gestures/P.mp4",
  Q: "/gestures/Q.mp4",
  R: "/gestures/R.mp4",
  S: "/gestures/S.mp4",
  T: "/gestures/T.mp4",
  U: "/gestures/U.mp4",
  V: "/gestures/V.mp4",
  W: "/gestures/W.mp4",
  X: "/gestures/X.mp4",
  Y: "/gestures/Y.mp4",
  Z: "/gestures/Z.mp4",
  " ": "/gestures/SPACE.mp4",
  
  // Common words
  HALO: "/gestures/HALO.mp4",
  NAMA: "/gestures/NAMA.mp4",
  AKU: "/gestures/AKU.mp4",
  KAMU: "/gestures/KAMU.mp4",
  DIA: "/gestures/DIA.mp4",
  KAMI: "/gestures/KAMI.mp4",
  KALIAN: "/gestures/KALIAN.mp4",
  MEREKA: "/gestures/MEREKA.mp4",
  
  APA: "/gestures/APA.mp4",
  SIAPA: "/gestures/SIAPA.mp4",
  DIMANA: "/gestures/DIMANA.mp4",
  KAPAN: "/gestures/KAPAN.mp4",
  MENGAPA: "/gestures/MENGAPA.mp4",
  
  BAIK: "/gestures/BAIK.mp4",
  BURUK: "/gestures/BURUK.mp4",
  BAGUS: "/gestures/BAGUS.mp4",
  JELEK: "/gestures/JELEK.mp4",
  
  MAKAN: "/gestures/MAKAN.mp4",
  MINUM: "/gestures/MINUM.mp4",
  TIDUR: "/gestures/TIDUR.mp4",
  JALAN: "/gestures/JALAN.mp4",
  LARI: "/gestures/LARI.mp4",
  
  AYAH: "/gestures/AYAH.mp4",
  IBU: "/gestures/IBU.mp4",
  KAKAK: "/gestures/KAKAK.mp4",
  ADIK: "/gestures/ADIK.mp4",
  ABANG: "/gestures/ABANG.mp4",
  KAKUQ: "/gestures/KAKUQ.mp4",
  
  SEKOLAH: "/gestures/SEKOLAH.mp4",
  RUMAH: "/gestures/RUMAH.mp4",
  MOBIL: "/gestures/MOBIL.mp4",
  SEPEDA: "/gestures/SEPEDA.mp4",
  
  HARI: "/gestures/HARI.mp4",
  BULAN: "/gestures/BULAN.mp4",
  MINGGU: "/gestures/MINGGU.mp4",
  SENIN: "/gestures/SENIN.mp4",
  
  SATU: "/gestures/SATU.mp4",
  DUA: "/gestures/DUA.mp4",
  TIGA: "/gestures/TIGA.mp4",
  EMPAT: "/gestures/EMPAT.mp4",
  LIMA: "/gestures/LIMA.mp4",
  ENAM: "/gestures/ENAM.mp4",
  TUJUH: "/gestures/TUJUH.mp4",
  DELAPAN: "/gestures/DELAPAN.mp4",
  SEMBILAN: "/gestures/SEMBILAN.mp4",
  SEPULUH: "/gestures/SEPULUH.mp4",
};

// Validation helper
export const isValidGesture = (char) => {
  return char in GESTURE_LABELS;
};

// Get gesture info
export const getGestureInfo = (char) => {
  const upperChar = char.toUpperCase();
  return {
    char: upperChar,
    label: GESTURE_LABELS[upperChar] || "Unknown",
    videoUrl: GESTURE_VIDEO_PATHS[upperChar] || null,
    isValid: isValidGesture(upperChar),
  };
};

// Filter valid gestures from text
export const filterValidGestures = (text) => {
  return text
    .toUpperCase()
    .split("")
    .filter((char) => isValidGesture(char))
    .map((char) => getGestureInfo(char));
};
