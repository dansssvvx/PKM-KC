# ⚡ Dual Mode Quick Reference

**Dual-Mode Text-to-Sign Feature - Quick Lookup**

---

## 🎯 What's New?

Two operating modes in one feature:
- **📝 Per Kata** (Word-based) - DEFAULT
- **🔤 Per Huruf** (Character-based) - ALTERNATIVE

---

## 📝 Per Kata Mode (Word-Based)

### When to Use
✅ Natural language translation
✅ Vocabulary learning
✅ Conversational signing
✅ Faster playback

### Example
```
Input:  "AYAH MAKAN"
Output: 2 cards [AYAH] [MAKAN]
Time:   2 seconds
Labels: Father, Eat
```

### Code
```javascript
split(/\s+/)  // Split by whitespace
```

---

## 🔤 Per Huruf Mode (Character-Based)

### When to Use
✅ Spelling practice
✅ Proper nouns (names)
✅ Unknown words
✅ Character-by-character learning

### Example
```
Input:  "AYAH"
Output: 4 cards [A] [Y] [A] [H]
Time:   4 seconds
Labels: A, Y, A, H
```

### Code
```javascript
split("").filter(char => char !== " ")  // Split by character, remove spaces
```

---

## 🎬 How to Use

### Step 1: Choose Mode
Click one of these buttons (top of page):
```
┌────────────┐   ┌────────────┐
│ 📝 Per Kata│ OR │🔤 Per Huruf│
└────────────┘   └────────────┘
```

### Step 2: Type Text
```
📝 Per Kata:  "HALO SAYA MAKAN"
🔤 Per Huruf: "HALOSASAMAKAN" (or with spaces, will be removed)
```

### Step 3: Click Convert
Click "✨ Konversi ke Gesture"

### Step 4: See Results
- **Per Kata**: Fewer, larger cards
- **Per Huruf**: More, smaller cards

### Step 5: Play (Optional)
Click "▶️ Putar Animasi" to see sequence

---

## 📊 Quick Comparison

| | Per Kata | Per Huruf |
|---|----------|-----------|
| **Split** | By spaces | By letters |
| **Spaces** | Separated | Removed |
| **Vocab** | 60+ words | A-Z letters |
| **"HALO"** | 1 card | 4 cards |
| **"HALO SAYA"** | 2 cards | 8 cards |
| **Speed** | ⚡ Fast | 🐢 Slow |
| **Best for** | Conversation | Spelling |

---

## 🎓 Example Scenarios

### Scenario 1: Greeting
```
Per Kata:  "HALO NAMA SAYA SARAH"
           → [HALO] [NAMA] [SAYA] [SARAH] → 4 cards ✅

Per Huruf: "HALO"
           → [H] [A] [L] [O] → 4 cards (good for spelling)
```

### Scenario 2: Vocabulary
```
Per Kata:  "MAKAN MINUM TIDUR"
           → [MAKAN] [MINUM] [TIDUR] → 3 cards ✅

Per Huruf: Would give you 13 cards (too many!)
```

### Scenario 3: Unknown Word
```
Per Kata:  "GAJAH" (Elephant)
           → [GAJAH] → 1 card (but might not have gesture)

Per Huruf: "GAJAH"
           → [G] [A] [J] [A] [H] → 5 cards (can spell it out) ✅
```

---

## 🔧 How It Works

### State
```javascript
const [mode, setMode] = useState("word");
// "word" or "char"
```

### Logic
```javascript
if (mode === "word") {
  items = inputText.trim().split(/\s+/);
} else {
  items = inputText.toUpperCase().split("").filter(c => c !== " ");
}
```

### Display
```javascript
{mode === "word" ? "kata" : "huruf"}
// Shows "3 kata" or "8 huruf"
```

---

## ✅ Testing Checklist

- [ ] Click "📝 Per Kata" → Button highlights blue
- [ ] Type "HALO SAYA" → Click convert → See 2 cards
- [ ] Click "🔤 Per Huruf" → Button highlights blue, results clear
- [ ] Type "HALO" → Click convert → See 4 cards
- [ ] Switch modes → Previous results clear
- [ ] Display shows correct count (kata vs huruf)

---

## 💡 Tips

### Choose Per Kata When:
- User types naturally with spaces
- Learning vocabulary
- Conversational signing
- Want fewer gestures
- Need faster playback

### Choose Per Huruf When:
- Learning to spell
- Teaching letter shapes
- Translating proper nouns
- Unknown vocabulary
- Want detailed breakdown

### Switch Anytime:
- Results automatically clear
- No need to refresh
- Same input, different output
- Instant mode change

---

## 📁 Files Changed

```
src/components/
├── textToSign.jsx     ← Added mode state & logic
└── textToSign.css     ← Added mode selector styles
```

### What's New in Code

**JSX**: 
- Mode state: `const [mode, setMode] = useState("word")`
- Mode buttons: "Per Kata" and "Per Huruf"
- Mode-based split logic
- Dynamic label (kata/huruf)

**CSS**:
- `.mode-selector` - Container styling
- `.mode-buttons` - Button layout
- `.mode-btn` - Button styling
- `.mode-btn.active` - Active state

---

## 🎯 Common Questions

### Q: Which mode is default?
A: **Per Kata** is default (word-based)

### Q: Can I switch modes?
A: **Yes!** Click any button anytime

### Q: Does switching delete my text?
A: **No**, text stays, results clear

### Q: What happens to spaces?
A: 
- Per Kata: Kept as separators
- Per Huruf: Removed (letters only)

### Q: Can I use both modes together?
A: **No**, choose one at a time

### Q: Which mode is better?
A: **Depends on goal!**
- Per Kata = Fluency
- Per Huruf = Accuracy

### Q: Do videos work with both modes?
A: **Yes!** Same video files work

### Q: Can I add more words/letters?
A: **Yes!** Check gestures.js constants

---

## 🚀 Next Steps

1. **Test immediately**: Run `npm run dev`
2. **Try both modes**: Switch and compare
3. **Add videos**: Place `.mp4` files in `public/gestures/`
4. **Expand vocabulary**: Add words to `gestures.js`
5. **Integrate more**: Connect to backend API

---

## 📚 Related Docs

- [DUAL_MODE_FEATURE.md](DUAL_MODE_FEATURE.md) - Complete guide (30 min read)
- [MODE_COMPARISON.md](MODE_COMPARISON.md) - Detailed comparison (20 min read)
- [START_HERE.md](START_HERE.md) - Quick start (5 min read)
- [WORD_BASED_FEATURE.md](WORD_BASED_FEATURE.md) - Original feature guide

---

## 📊 Mode Selection Guide

```
What are you doing?
│
├─ Conversation/Communication
│  └─ Use: 📝 Per Kata
│
├─ Vocabulary Learning
│  └─ Use: 📝 Per Kata
│
├─ Spelling Practice
│  └─ Use: 🔤 Per Huruf
│
├─ Teaching Name/Proper Noun
│  └─ Use: 🔤 Per Huruf
│
└─ Unknown Word
   └─ Use: 🔤 Per Huruf (spell it out)
```

---

## 🎨 Visual Summary

### Per Kata Mode
```
Input:  "MAKAN NASI"
Output:
┌───────────┐  ┌──────────┐
│  MAKAN    │  │  NASI    │
│   Eat     │  │  Rice    │
│  📹 Video │  │📹 Video  │
└───────────┘  └──────────┘
Cards:  2 (one per word)
Time:   ~2 seconds
```

### Per Huruf Mode
```
Input:  "MAKAN"
Output:
┌──┐┌──┐┌──┐┌──┐┌──┐
│M ││A ││K ││A ││N │
│  ││  ││  ││  ││  │
│📹││📹││📹││📹││📹│
└──┘└──┘└──┘└──┘└──┘
Cards:  5 (one per letter)
Time:   ~5 seconds
```

---

## ✨ Features

✅ **Two modes** - Per kata and per huruf
✅ **Easy switching** - Click button to change
✅ **Auto-clear** - Results clear on mode change
✅ **Dynamic labels** - Shows "kata" or "huruf"
✅ **Same vocabulary** - Both modes work with gestures.js
✅ **No friction** - Instant mode change
✅ **Full integration** - Works with all features

---

## 📊 Statistics

### Per Kata - "SELAMAT PAGI"
- Items: 2
- Time: 2s
- Type: Words

### Per Huruf - "SELAMAT PAGI"
- Items: 11
- Time: 11s
- Type: Letters

**5.5x more cards in Per Huruf mode**

---

## 🎯 Decision Matrix

| Use Case | Mode | Why |
|----------|------|-----|
| Daily chat | Per Kata | Natural flow |
| Learning words | Per Kata | Meaning focus |
| Spelling lesson | Per Huruf | Letter by letter |
| Name signing | Per Huruf | Spell it out |
| Unfamiliar word | Per Huruf | No vocab? Spell! |
| Movie line | Per Kata | Speed matters |
| Speech practice | Per Huruf | Precision |
| Quick message | Per Kata | Fast |

---

## 🎉 Summary

**Feature**: Dual-mode Text-to-Sign
**Per Kata**: Word-based (fast, natural)
**Per Huruf**: Character-based (detailed, spelling)
**Status**: ✅ Ready to use!

---

**Last Updated**: February 5, 2026
**Version**: 2.0
**Status**: Complete ✅
