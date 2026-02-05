# 📖 Word-Based Text-to-Sign Feature Guide

## ✨ Perubahan: Per Kata Bukan Per Huruf

Fitur Text-to-Sign telah diupdate untuk bekerja **per kata** (word-based) bukan per huruf (character-based)!

### Sebelum (Per Huruf)
```
Input: "HALO"
Output: 4 gesture cards
  - H (letter)
  - A (letter)
  - L (letter)
  - O (letter)
```

### Sesudah (Per Kata)
```
Input: "HALO"
Output: 1 gesture card
  - HALO (complete word)

Input: "SAYA MAKAN NASI"
Output: 3 gesture cards
  - SAYA (word/pronoun)
  - MAKAN (verb)
  - NASI (noun)
```

---

## 🎯 Keuntungan Sistem Per Kata

✅ **Lebih Natural** - Gesture sequence mengikuti alur kata dalam bahasa
✅ **Lebih Efisien** - Lebih sedikit video yang dibutuhkan
✅ **Lebih Mudah** - User hanya ketik kata, bukan jajar huruf
✅ **Lebih Semantik** - Meaningful gesture sequences
✅ **Support Frasa** - Bisa translate idiom dan frasa

---

## 📚 Vocabulary Tersedia

Sistem sudah dilengkapi dengan 60+ kata-kata umum Indonesia:

### Pronoun (Kata Ganti)
- AKU (I/Me)
- KAMU (You)
- DIA (He/She)
- KAMI (We - exclusive)
- KALIAN (You all)
- MEREKA (They)

### Pertanyaan (Questions)
- APA (What)
- SIAPA (Who)
- DIMANA (Where)
- KAPAN (When)
- MENGAPA (Why)

### Adjective (Sifat)
- BAIK (Good)
- BURUK (Bad)
- BAGUS (Nice)
- JELEK (Ugly)

### Verb (Kata Kerja)
- MAKAN (Eat)
- MINUM (Drink)
- TIDUR (Sleep)
- JALAN (Walk)
- LARI (Run)

### Family (Keluarga)
- AYAH (Father)
- IBU (Mother)
- KAKAK (Older sibling)
- ADIK (Younger sibling)
- ABANG (Older brother)

### Places (Tempat)
- RUMAH (House)
- SEKOLAH (School)
- MOBIL (Car)
- SEPEDA (Bicycle)

### Time (Waktu)
- HARI (Day)
- BULAN (Month)
- MINGGU (Week)
- SENIN (Monday)

### Numbers (Angka)
- SATU (One)
- DUA (Two)
- TIGA (Three)
- EMPAT (Four)
- LIMA (Five)
- ... sampai SEPULUH (Ten)

### Greeting (Sapaan)
- HALO (Hello)
- NAMA (Name)

---

## 🧪 Cara Test

### Test 1: Kata Tunggal
```
Input: "HALO"
Klik: ✨ Konversi ke Gesture
Output: 1 gesture card dengan "HALO"
```

### Test 2: Multiple Words
```
Input: "SAYA MAKAN"
Klik: ✨ Konversi ke Gesture
Output: 2 gesture cards
  - SAYA
  - MAKAN
```

### Test 3: Kalimat Lengkap
```
Input: "AYAH MAKAN NASI"
Klik: ✨ Konversi ke Gesture
Output: 3 gesture cards
  - AYAH
  - MAKAN
  - NASI (jika ada di vocabulary)
     atau fallback ke "NASI" sebagai label generic
```

### Test 4: Kata Tidak Ada di Vocabulary
```
Input: "GAJAH BESAR"
Klik: ✨ Konversi ke Gesture
Output: 2 gesture cards
  - GAJAH (label: "GAJAH" - custom word)
  - BESAR (label: "BESAR" - custom word)
Note: Video placeholder untuk unknown words tetap ditampilkan
```

---

## 🎬 Video File Structure (Per Kata)

Untuk full functionality dengan videos, siapkan file structure:

```
public/gestures/
├── [Single Letters - Optional]
│   ├── A.mp4
│   ├── B.mp4
│   └── ... (Z.mp4)
│
├── [Common Words]
│   ├── HALO.mp4
│   ├── NAMA.mp4
│   ├── AKU.mp4
│   ├── KAMU.mp4
│   ├── DIA.mp4
│   ├── KAMI.mp4
│   ├── KALIAN.mp4
│   ├── MEREKA.mp4
│   │
│   ├── APA.mp4
│   ├── SIAPA.mp4
│   ├── DIMANA.mp4
│   ├── KAPAN.mp4
│   ├── MENGAPA.mp4
│   │
│   ├── BAIK.mp4
│   ├── BURUK.mp4
│   ├── BAGUS.mp4
│   ├── JELEK.mp4
│   │
│   ├── MAKAN.mp4
│   ├── MINUM.mp4
│   ├── TIDUR.mp4
│   ├── JALAN.mp4
│   ├── LARI.mp4
│   │
│   ├── AYAH.mp4
│   ├── IBU.mp4
│   ├── KAKAK.mp4
│   ├── ADIK.mp4
│   ├── ABANG.mp4
│   │
│   ├── RUMAH.mp4
│   ├── SEKOLAH.mp4
│   ├── MOBIL.mp4
│   ├── SEPEDA.mp4
│   │
│   ├── HARI.mp4
│   ├── BULAN.mp4
│   ├── MINGGU.mp4
│   ├── SENIN.mp4
│   │
│   ├── SATU.mp4
│   ├── DUA.mp4
│   ├── ... (sampai SEPULUH.mp4)
│   │
│   └── SPACE.mp4 (for spacing/pause)
```

---

## ➕ Menambah Kata Baru

### Langkah 1: Edit `gestures.js`
Tambahkan kata ke `GESTURE_LABELS`:

```javascript
GESTURE_LABELS = {
  // ... existing
  GAJAH: "🐘 Gajah - Gerakan belalai",
  BESAR: "📏 Besar - Gerakan lebar",
  KECIL: "👌 Kecil - Gerakan pinch",
}
```

### Langkah 2: Update `GESTURE_VIDEO_PATHS`
```javascript
GESTURE_VIDEO_PATHS = {
  // ... existing
  GAJAH: "/gestures/GAJAH.mp4",
  BESAR: "/gestures/BESAR.mp4",
  KECIL: "/gestures/KECIL.mp4",
}
```

### Langkah 3: Buat Video File
```
public/gestures/GAJAH.mp4
public/gestures/BESAR.mp4
public/gestures/KECIL.mp4
```

### Langkah 4: Test
```
Input: "GAJAH BESAR"
Output: 2 gesture cards dengan video baru
```

---

## 🔄 Fallback Behavior

### Untuk Kata yang Belum di Dictionary

Jika user input kata yang belum ada di `GESTURE_LABELS`:

1. **Dengan Video**: Akan mencari file `/gestures/WORD.mp4`
2. **Tanpa Video**: Menampilkan placeholder dengan label = kata itu sendiri

```javascript
// Contoh: Input "GAJAH" (belum di vocab)
{
  word: "GAJAH",
  label: "GAJAH",  // fallback: gunakan kata itu sendiri
  videoUrl: "/gestures/GAJAH.mp4"
}
```

---

## 📝 Code Changes Detail

### File: `textToSign.jsx`

**Sebelum:**
```jsx
const characters = inputText.toUpperCase().split("");
const mappedGestures = characters.map((char) => ({
  char,
  videoUrl: `/gestures/${char === " " ? "SPACE" : char}.mp4`,
  label: getGestureLabel(char),
}));
```

**Sesudah:**
```jsx
const words = inputText.trim().split(/\s+/);
const mappedGestures = words.map((word) => ({
  word: word.toUpperCase(),
  videoUrl: `/gestures/${word.toUpperCase()}.mp4`,
  label: getGestureLabel(word.toUpperCase()),
}));
```

### Key Changes:
- ✅ `split("")` → `split(/\s+/)` (split by whitespace)
- ✅ `char` → `word`
- ✅ Handle multiple spaces dengan regex `/\s+/`
- ✅ Trim input untuk menghilangkan leading/trailing spaces
- ✅ Update UI label dari "karakter" menjadi "kata"

---

## ⚙️ Configuration Tips

### Untuk Menambah Vocabulary Besar

Jika ingin support lebih banyak kata, bisa:

#### Option 1: Local Dictionary
Expand `GESTURE_LABELS` dan `GESTURE_VIDEO_PATHS` di `gestures.js`

#### Option 2: Backend Dictionary
```javascript
// Fetch dari server
const getGestureLabel = async (word) => {
  const response = await fetch(`/api/gesture/${word}`);
  return response.json();
}
```

#### Option 3: Database
```javascript
// Query database untuk gesture mapping
const gestures = await db.query(
  'SELECT label FROM gestures WHERE word = ?',
  [word]
);
```

---

## 🎯 Use Cases

### Use Case 1: Simple Greetings
```
Input: "HALO NAMA AKU BUDI"
Output: 4 gesture videos
  - HALO (greeting)
  - NAMA (name)
  - AKU (I)
  - BUDI (name - fallback)
```

### Use Case 2: Simple Questions
```
Input: "APA NAMA KAMU"
Output: 3 gesture videos
  - APA (what)
  - NAMA (name)
  - KAMU (you)
```

### Use Case 3: Sentence
```
Input: "AYAH MAKAN NASI"
Output: 3 gesture videos
  - AYAH (father)
  - MAKAN (eat)
  - NASI (rice - fallback or defined)
```

### Use Case 4: Conversation
```
Input: "SAYA AKU MINUM AIR"
Output: 4 gesture videos
  - SAYA (I - variant)
  - AKU (I)
  - MINUM (drink)
  - AIR (water - fallback)
```

---

## 🚀 Performance Comparison

| Metric | Per Huruf | Per Kata |
|--------|-----------|----------|
| Input: "HALO" | 4 gestures | 1 gesture |
| Input: "AYAH BEKERJA" | 10 gestures | 2 gestures |
| Video Files Needed | 26 (A-Z) | 50-200+ (vocab) |
| Playback Time | Slower | Faster |
| User Experience | Laborious | Natural |

---

## ✨ Next Steps

1. ✅ **Code Updated** - Per kata system sudah implemented
2. ✅ **60+ Words Mapped** - Vocabulary siap digunakan
3. 📹 **Add Videos** - Buat/upload gesture videos per kata
4. 🧪 **Test Thoroughly** - Test berbagai input kombinasi
5. 🚀 **Deploy** - Push ke production

---

## 💡 Tips & Tricks

### Tip 1: Case Insensitive
```
Input: "halo", "Halo", "HALO"
Semua akan diconvert ke "HALO" - same gesture ✅
```

### Tip 2: Multiple Spaces
```
Input: "AYAH  MAKAN   NASI" (multiple spaces)
Output: Tetap 3 gestures (spaces otomatis di-trim) ✅
```

### Tip 3: Gesture Suggestion
Bisa ditambahkan autocomplete:
```javascript
Input: "AY"
Suggestion: AYAH ✓
```

### Tip 4: Pronunciation Guide
Bisa tambahkan pronunciation:
```javascript
AYAH: {
  label: "👨 Ayah (Father)",
  pronunciation: "ah-yah",
  videoUrl: "/gestures/AYAH.mp4"
}
```

---

## 📞 Support

Jika ada pertanyaan:
- Check `GESTURE_LABELS` untuk kata yang tersedia
- Add kata baru ke `gestures.js`
- Test dengan contoh di atas
- Upload video sesuai `/gestures/WORD.mp4` pattern

---

**Status**: ✅ **Per Kata System - READY TO USE!**

🎬 Siap untuk video per kata! 🚀
