# 🔄 Mode Comparison Guide - Per Kata vs Per Huruf

**Quick Reference for Text-to-Sign Modes**

---

## 📊 Side-by-Side Comparison

### Input: "HALO SAYA"

```
╔════════════════════════════════════════════════════════════════╗
║                    PER KATA (Word-Based)                       ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  Input:  "HALO SAYA"                                          ║
║         ↓                                                       ║
║  Split:  split(/\s+/)                                         ║
║         ↓                                                       ║
║  Items:  ["HALO", "SAYA"]                                     ║
║         ↓                                                       ║
║  Count:  2 gesture cards                                      ║
║         ↓                                                       ║
║  Cards:  ┌─────────┐  ┌─────────┐                            ║
║          │  HALO   │  │  SAYA   │                            ║
║          │ (Word)  │  │ (Word)  │                            ║
║          └─────────┘  └─────────┘                            ║
║                                                                ║
║  Speed: ⚡⚡⚡ Fast (2 gestures)                               ║
║  Use:   Natural language, vocabulary                          ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
```

```
╔════════════════════════════════════════════════════════════════╗
║                  PER HURUF (Character-Based)                   ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  Input:  "HALO SAYA"                                          ║
║         ↓                                                       ║
║  Split:  split("").filter(c => c !== " ")                    ║
║         ↓                                                       ║
║  Items:  ["H","A","L","O","S","A","Y","A"]                   ║
║         ↓                                                       ║
║  Count:  8 gesture cards                                      ║
║         ↓                                                       ║
║  Cards:  ┌──┐┌──┐┌──┐┌──┐┌──┐┌──┐┌──┐┌──┐                   ║
║          │H ││A ││L ││O ││S ││A ││Y ││A │                   ║
║          │  ││  ││  ││  ││  ││  ││  ││  │                   ║
║          └──┘└──┘└──┘└──┘└──┘└──┘└──┘└──┘                   ║
║                                                                ║
║  Speed: 🐢🐢🐢 Slower (8 gestures)                              ║
║  Use:   Spelling, character by character                      ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
```

---

## 🎯 Feature Matrix

| Aspect | Per Kata | Per Huruf |
|--------|----------|-----------|
| **Split Method** | By whitespace | By character |
| **Space Handling** | Separator | Removed |
| **Vocabulary** | 60+ words | 26 letters A-Z |
| **Example Output** | "HALO SAYA" → 2 | "HALO SAYA" → 8 |
| **Playback Time** | Shorter | Longer |
| **Learning** | Vocabulary | Spelling |
| **Natural Use** | ✅ Yes | ❌ No |
| **Conversation** | ✅ Best | ❌ Awkward |
| **Spelling Class** | ❌ Not ideal | ✅ Best |
| **Known Words** | ✅ Best | ❌ Overkill |
| **Unknown Words** | ❌ Problematic | ✅ Can spell |
| **User Fluency** | ⭐⭐⭐⭐⭐ | ⭐ |

---

## 🎬 Real-World Examples

### Example 1: Greeting

**Per Kata** - Natural conversation:
```
User says: "HALO NAMA SAYA SARAH"
         ↓
Display: [HALO] [NAMA] [SAYA] [SARAH]
         ↓
Cards:   4 gesture cards
Speed:   ⚡ Quick to play
```

**Per Huruf** - Spelling practice:
```
User says: "SARAH"
         ↓
Display: [S] [A] [R] [A] [H]
         ↓
Cards:   5 letter cards
Speed:   🐢 Takes time
```

---

### Example 2: Vocabulary Learning

**Per Kata** - Learning words:
```
Input:   "AYAH IBU KAKAK ADIK"
Display: [AYAH] [IBU] [KAKAK] [ADIK]
         ↓
Learn:   4 vocabulary words
         • Father
         • Mother
         • Older sibling
         • Younger sibling
```

**Per Huruf** - Learning letters:
```
Input:   "AYAH"
Display: [A] [Y] [A] [H]
         ↓
Learn:   4 letter shapes
         (A appears twice)
```

---

### Example 3: Unfamiliar Word

**Per Kata** - Challenge:
```
Input:   "GAJAH" (Elephant)
Problem: Word not in vocabulary
Result:  Shows label as "GAJAH" (undefined)
         User confused
```

**Per Huruf** - Solution:
```
Input:   "GAJAH"
Display: [G] [A] [J] [A] [H]
Result:  Can spell out unknown word
         User learns each letter
```

---

## 📈 Growth Chart

```
User Learning Path:

Beginner
├─ Using Per Kata
│  └─ Learns common words
│     └─ Builds vocabulary
│        └─ Can communicate phrases
│
Expert
├─ Switches to Per Huruf
│  └─ Spells proper nouns
│  └─ Handles unknown words
│  └─ Full flexibility
│
Fluent
└─ Uses both modes strategically
   ├─ Per Kata for speed
   ├─ Per Huruf for accuracy
   └─ Switches as needed
```

---

## 🎮 How to Switch

### UI Location

```
┌─────────────────────────────────────────┐
│ 🎯 Pilih Mode:                          │
│ ┌─────────────────┐  ┌──────────────┐  │
│ │ 📝 Per Kata     │  │ 🔤 Per Huruf │  │
│ │  (Press me!)    │  │              │  │
│ └─────────────────┘  └──────────────┘  │
└─────────────────────────────────────────┘
```

### Switching Steps

1. **Click** the mode button (top of page)
   - Button changes to blue (active)
   - Previous results clear

2. **Type** your text
   ```
   📝 Per Kata:  "HALO SAYA"
   🔤 Per Huruf: "HALOSA" (no spaces)
   ```

3. **Click** "✨ Konversi ke Gesture"

4. **View** results (different count!)

5. **Switch back** anytime (just click the button)

---

## ✅ Decision Tree

```
                    ┌─ What are you doing?
                    │
        ┌───────────┼───────────┐
        │           │           │
    Talking    Learning      Spelling
        │       Words         Names
        │           │           │
        ↓           ↓           ↓
    Per Kata    Per Kata    Per Huruf
    (Natural)   (Vocab)     (Letters)
```

---

## 💡 Use Case Scenarios

### Scenario 1: Teacher Teaching Vocabulary

**Situation**: Class learning family words
**Mode**: Per Kata
**Words**: "AYAH", "IBU", "KAKAK", "ADIK"
**Benefit**: 4 gestures (one per word), each has meaning

```
Per Kata:  [AYAH] [IBU] [KAKAK] [ADIK]  ← 4 cards (good!)
Per Huruf: [A][Y][A][H]... [I][B][U]... (16 cards - too much!)
```

---

### Scenario 2: Teaching Spelling

**Situation**: Learning to spell names in sign language
**Mode**: Per Huruf
**Words**: "SARAH", "JOHN"
**Benefit**: Each letter shown individually

```
Per Kata:  [SARAH] [JOHN]           ← 2 cards (can't see letters)
Per Huruf: [S][A][R][A][H][J][O][H][N] ← 9 cards (spelling practice!)
```

---

### Scenario 3: Daily Conversation

**Situation**: Chatting with Deaf friend
**Mode**: Per Kata
**Phrase**: "SAYA MAKAN NASI GORENG"
**Benefit**: Natural pace, clear meaning

```
Per Kata:  [SAYA] [MAKAN] [NASI] [GORENG]  ← Natural!
Per Huruf: 18 letters! ← Too slow and unnatural
```

---

### Scenario 4: Unfamiliar Word

**Situation**: Need to sign unknown word
**Mode**: Per Huruf
**Word**: "SEPEDA" (bicycle)
**Benefit**: Spell it out letter by letter

```
Per Kata:  [SEPEDA]    ← Not in vocabulary, shows label as "SEPEDA"
Per Huruf: [S][E][P][E][D][A] ← User understands through spelling
```

---

## 🎓 Teaching Guide

### For Word Vocabulary (Per Kata)

**Objective**: Learn vocabulary
**Duration**: 10 minutes
**Steps**:
1. Select "📝 Per Kata" mode
2. Show word: "AYAH"
3. Demonstrate gesture
4. Explain meaning: "Father"
5. Repeat with 5-10 words
6. Quiz with sentence

**Example Lesson**:
```
Mode:    Per Kata
Words:   AYAH (Father), IBU (Mother), RUMAH (House), MAKAN (Eat)
Format:  [AYAH] [MAKAN] [RUMAH]
Result:  Teaches both gestures and sentence formation
```

---

### For Character/Spelling (Per Huruf)

**Objective**: Learn letter shapes
**Duration**: 15 minutes
**Steps**:
1. Select "🔤 Per Huruf" mode
2. Show letter: "A"
3. Show hand shape
4. Practice position
5. Repeat 5-7 letters
6. Spell simple words

**Example Lesson**:
```
Mode:    Per Huruf
Letters: A, B, C, D, E
Format:  [A] [B] [C] [D] [E]
Result:  Teaches hand shapes for each letter
```

---

## 🎨 Visual Difference

### Per Kata Display

```
Input:  "MAKAN MINUM TIDUR"

┌───────────┬───────────┬───────────┐
│  MAKAN    │  MINUM    │  TIDUR    │
│   Eat     │   Drink   │   Sleep   │
│  (Video)  │  (Video)  │  (Video)  │
└───────────┴───────────┴───────────┘
     ↑           ↑           ↑
     3 big cards (easy to see)
```

### Per Huruf Display

```
Input:  "MAKAN"

┌───┬───┬───┬───┬───┐
│ M │ A │ K │ A │ N │
│ M │ A │ K │ A │ N │
│ ▶ │ ▶ │ ▶ │ ▶ │ ▶ │
└───┴───┴───┴───┴───┘
  ↑   ↑   ↑   ↑   ↑
  5 small cards (detailed spelling)
```

---

## 📊 Statistics

### Example: "SELAMAT PAGI SEMUA" (Good morning everyone)

**Per Kata**:
- Gesture count: 3
- Playback duration: 3 seconds
- Vocabulary: [SELAMAT] [PAGI] [SEMUA]
- Meaning: Clear

**Per Huruf**:
- Gesture count: 14
- Playback duration: 14 seconds
- Vocabulary: [S][E][L][A][M][A][T][P][A][G][I][S][E][M][U][A]
- Meaning: Letter by letter

---

## 🚀 Quick Start

### I want to:

**...learn vocabulary**
→ Use **Per Kata** mode
→ Type: "AYAH IBU KAKAK"
→ Result: 3 meaningful gestures

**...spell a word**
→ Use **Per Huruf** mode
→ Type: "SARAH"
→ Result: S-A-R-A-H (5 letter gestures)

**...have a conversation**
→ Use **Per Kata** mode
→ Type: "APA KABAR"
→ Result: Natural greeting

**...translate unfamiliar word**
→ Use **Per Huruf** mode
→ Type the word letter by letter
→ Result: Can spell out meaning

**...teach children**
→ Start with **Per Kata**
→ Use simple vocabulary
→ Progress to **Per Huruf** for spelling

---

## ⚙️ Technical Details

### How Mode is Stored

```javascript
const [mode, setMode] = useState("word");  // Default: "word"
                                          // Alternative: "char"
```

### How Mode Affects Processing

```javascript
if (mode === "word") {
  // Per Kata: split by whitespace
  items = inputText.trim().split(/\s+/);
  // Result: words in array
} else {
  // Per Huruf: split by character, remove spaces
  items = inputText.toUpperCase().split("").filter(c => c !== " ");
  // Result: letters in array
}
```

### How Vocabulary Lookup Works

```javascript
// Both modes use same GESTURE_LABELS
const label = GESTURE_LABELS[item] || item;

// Per Kata example:
GESTURE_LABELS["AYAH"] = "Father"

// Per Huruf example:
GESTURE_LABELS["A"] = "Aitch"
```

---

## 🎯 Recommendations

### For Beginners
✅ Start with **Per Kata** mode
✅ Learn common vocabulary first
✅ Build confidence with phrases
✅ Progress to **Per Huruf** as needed

### For Teachers
✅ Use **Per Kata** for vocabulary lessons
✅ Use **Per Huruf** for spelling practice
✅ Mix both in advanced lessons
✅ Let students choose for independence

### For Learners
✅ Choose mode based on goal
✅ Per Kata for fluency
✅ Per Huruf for precision
✅ Switch as needed

---

## 🎉 Summary

**Per Kata Mode**:
- 📝 For natural language
- 🎓 Learning vocabulary
- 💬 Conversation
- ⚡ Faster playback

**Per Huruf Mode**:
- 🔤 For spelling
- 📚 Learning letters
- 📛 Proper nouns
- 🎯 Unknown words

**Both modes** work together for complete signing experience!

---

**Last Updated**: February 5, 2026
**Status**: ✅ Complete
