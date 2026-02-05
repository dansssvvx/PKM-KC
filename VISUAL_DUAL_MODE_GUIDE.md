# 🎨 Visual Dual Mode Guide

**Visual Examples & Diagrams for Per Kata & Per Huruf Modes**

---

## 🎯 Feature Overview

```
                    TEXT-TO-SIGN
                         │
          ┌──────────────┴──────────────┐
          │                             │
      Per Kata                      Per Huruf
    (Word-based)                 (Character-based)
          │                             │
      Natural                      Spelling
      Language                      Practice
```

---

## 📊 Mode Selector UI

### Visual Layout

```
╔═══════════════════════════════════════════════════════════════╗
║                   TEXT-TO-SIGN INTERFACE                      ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  🎯 Pilih Mode:                                              ║
║  ┌──────────────────┐       ┌──────────────────┐             ║
║  │  📝 Per Kata     │       │ 🔤 Per Huruf     │             ║
║  │  (ACTIVE/Blue)   │       │ (Inactive/Gray)  │             ║
║  └──────────────────┘       └──────────────────┘             ║
║                                                               ║
║  ────────────────────────────────────────────────────────    ║
║                                                               ║
║  📝 Masukkan Teks:                                           ║
║  ┌───────────────────────────────────────────────────────┐  ║
║  │ [Type text here]                                      │  ║
║  │                                                       │  ║
║  │                                                       │  ║
║  └───────────────────────────────────────────────────────┘  ║
║                                                               ║
║  [✨ Konversi ke Gesture] [Cancel]                           ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## 📝 Per Kata Mode (Word-Based)

### Example 1: Simple Greeting

```
┌─────────────────────────────────────────────────────────────┐
│ INPUT:  "HALO SAYA"                                         │
└─────────────────────────────────────────────────────────────┘
                            ↓
                   [SPLIT BY SPACES]
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ PROCESS:                                                    │
│   "HALO SAYA".split(/\s+/)                                 │
│   → ["HALO", "SAYA"]                                        │
│   → 2 items                                                 │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ OUTPUT: 2 GESTURE CARDS                                     │
│                                                             │
│  ┌──────────────┐      ┌──────────────┐                   │
│  │   HALO       │      │    SAYA      │                   │
│  │  (Hello)     │      │     (I/Me)   │                   │
│  │              │      │              │                   │
│  │ 📹 Video     │      │ 📹 Video     │                   │
│  │              │      │              │                   │
│  └──────────────┘      └──────────────┘                   │
│                                                             │
│  Playback Time: ~2 seconds (1 sec per gesture)            │
│  Natural?: ✅ YES                                          │
│  Use Case: Conversation                                    │
└─────────────────────────────────────────────────────────────┘
```

---

### Example 2: Longer Sentence

```
INPUT: "AYAH MAKAN NASI GORENG DI RUMAH"
                      ↓
ITEMS: [AYAH] [MAKAN] [NASI] [GORENG] [DI] [RUMAH]
         ↓
OUTPUT: 6 GESTURE CARDS (one per word)

┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌──┐ ┌────┐
│AYAH│ │MAKAN││NASI││GORN││DI││RMH │
│Father│Eat  Rice  Fried in  House
└────┘ └────┘ └────┘ └────┘ └──┘ └────┘

Meaning: "Father eats fried rice at home"
Speed: ⚡ Natural pace
```

---

### Example 3: Vocabulary Learning

```
VOCABULARY LESSON
─────────────────────────────────────

Input:  "MAKAN MINUM TIDUR JALAN LARI"
Mode:   Per Kata
Cards:  5 meaningful words

DISPLAY:
┌────────────┬────────────┬────────────┐
│   MAKAN    │   MINUM    │   TIDUR    │
│    Eat     │   Drink    │   Sleep    │
│  [Video]   │  [Video]   │  [Video]   │
└────────────┴────────────┴────────────┘
┌────────────┬────────────┐
│   JALAN    │    LARI    │
│   Walk     │    Run     │
│  [Video]   │  [Video]   │
└────────────┴────────────┘

RESULT: Learn 5 new vocabulary words! ✅
```

---

## 🔤 Per Huruf Mode (Character-Based)

### Example 1: Simple Word

```
┌─────────────────────────────────────────────────────────────┐
│ INPUT:  "HALO"                                              │
└─────────────────────────────────────────────────────────────┘
                            ↓
                   [SPLIT BY CHARACTER]
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ PROCESS:                                                    │
│   "HALO".split("").filter(c => c !== " ")                 │
│   → ["H", "A", "L", "O"]                                   │
│   → 4 items                                                │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ OUTPUT: 4 GESTURE CARDS (letter by letter)                 │
│                                                             │
│  ┌──┐   ┌──┐   ┌──┐   ┌──┐                                │
│  │ H│   │ A│   │ L│   │ O│                                │
│  │  │   │  │   │  │   │  │                                │
│  │📹│   │📹│   │📹│   │📹│                                │
│  └──┘   └──┘   └──┘   └──┘                                │
│   H      A      L      O                                   │
│                                                             │
│  Playback Time: ~4 seconds (1 sec per letter)             │
│  Natural?: ❌ NO                                           │
│  Use Case: Spelling                                        │
└─────────────────────────────────────────────────────────────┘
```

---

### Example 2: Name Spelling

```
SPELLING A NAME
─────────────────────────────────────

Input:  "SARAH"
Mode:   Per Huruf
Cards:  5 letter cards

DISPLAY:
┌──┐┌──┐┌──┐┌──┐┌──┐
│S ││A ││R ││A ││H │
│  ││  ││  ││  ││  │
│📹││📹││📹││📹││📹│
└──┘└──┘└──┘└──┘└──┘
 S   A   R   A   H

RESULT: Can spell out "SARAH" letter by letter! ✅
```

---

### Example 3: Spelling Practice Lesson

```
SPELLING CLASS
─────────────────────────────────────

Words to Practice: SARAH, JOHN, EMMA

SARAH:
┌──┬──┬──┬──┬──┐
│S │A │R │A │H │  (5 letters)
└──┴──┴──┴──┴──┘

JOHN:
┌──┬──┬──┬──┐
│J │O │H │N │  (4 letters)
└──┴──┴──┴──┘

EMMA:
┌──┬──┬──┬──┐
│E │M │M │A │  (4 letters)
└──┴──┴──┴──┘

TOTAL: 13 letter cards to practice
TIME: ~13 seconds
RESULT: Learn spelling! ✅
```

---

## 🔄 Mode Comparison Visualization

### Input: "HALO SAYA MAKAN"

#### Per Kata Output

```
┌─────────────────────────────────────┐
│     Per Kata (Word-Based)           │
├─────────────────────────────────────┤
│  Input: "HALO SAYA MAKAN"           │
│                                     │
│  Split: by spaces                  │
│  Items: 3 words                     │
│                                     │
│  ┌─────────┐ ┌─────────┐ ┌───────┐│
│  │  HALO   │ │  SAYA   │ │ MAKAN ││
│  │ Hello   │ │  I/Me   │ │  Eat  ││
│  │ [Video] │ │ [Video] │ │[Video]││
│  └─────────┘ └─────────┘ └───────┘│
│                                     │
│  Cards: 3                           │
│  Time:  ~3 seconds                  │
│  Speed: ⚡⚡⚡ FAST                  │
│  Natural: ✅ YES                    │
└─────────────────────────────────────┘
```

#### Per Huruf Output

```
┌──────────────────────────────────────────┐
│    Per Huruf (Character-Based)           │
├──────────────────────────────────────────┤
│  Input: "HALO SAYA MAKAN"                │
│                                          │
│  Split: by character (no spaces)         │
│  Items: 12 letters                       │
│                                          │
│  ┌──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┐ │
│  │H │A │L │O │S │A │Y │A │M │A │K │N │ │
│  │  │  │  │  │  │  │  │  │  │  │  │  │ │
│  │📹│📹│📹│📹│📹│📹│📹│📹│📹│📹│📹│📹│ │
│  └──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┘ │
│                                          │
│  Cards: 12                               │
│  Time:  ~12 seconds                      │
│  Speed: 🐢🐢🐢 SLOW                      │
│  Natural: ❌ NO                          │
└──────────────────────────────────────────┘
```

---

## 📊 Ratio Comparison

```
Same Input: "HALO SAYA MAKAN"

Per Kata:  3 cards   ▓ small
Per Huruf: 12 cards  ▓▓▓▓ large

Ratio: 1:4 (Per Huruf has 4x more cards!)

                Per Kata
                   ▓
                   ▓
                   ▓
Per Huruf    ▓▓▓▓▓▓▓▓▓▓▓▓
             ▓▓▓▓▓▓▓▓▓▓▓▓

0   3       6    9    12    15
```

---

## 🎯 Mode Selection Flow Chart

```
                START
                  │
                  ↓
        What do you want?
        ┌─────────────────────┐
        │                     │
        ↓                     ↓
   Teaching            Spelling
   Vocabulary          Practice
        │                     │
        ↓                     ↓
    Per Kata              Per Huruf
    [WORD]                [LETTER]
        │                     │
        ↓                     ↓
   Type naturally        Type word
   "AYAH MAKAN"          "SARAH"
        │                     │
        ↓                     ↓
   Get 2 cards           Get 5 cards
   [AYAH][MAKAN]         [S][A][R][A][H]
        │                     │
        ↓                     ↓
    Learn words          Learn letters
```

---

## 🎬 Playback Timeline Comparison

### Per Kata: "HALO SAYA"

```
Timeline (2 seconds total):

0s      1s      2s
├───────┼───────┤
HALO    SAYA   END
 ▓       ▓
Card 1  Card 2

Speed: ⚡ Smooth, natural pace
```

### Per Huruf: "HALO"

```
Timeline (4 seconds total):

0s  1s  2s  3s  4s
├───┼───┼───┼───┤
H   A   L   O   END
▓   ▓   ▓   ▓
1   2   3   4

Speed: 🐢 Detailed, letter-by-letter
```

---

## 💡 Use Case Decision Tree

```
                    DECISION TREE
                         │
              ┌──────────┬┴┬──────────┐
              │          │ │          │
          Natural     Learn      Proper      Unknown
          Flow       Words       Nouns       Words
              │          │ │          │
              ↓          ↓ ↓          ↓
           Per Kata   Per Kata  Per Huruf  Per Huruf
           
Examples:  "Hello" "AYAH"      "SARAH"    "GAJAH"
           Chat   Vocab       Name       Can't spell
```

---

## 📈 Growth Path Visualization

```
BEGINNER to EXPERT JOURNEY

Beginner
  ↓
┌─────────────────────┐
│ Per Kata Only       │
│ Learning Words      │
│ Vocabulary Focus    │
│ ⭐⭐⭐⭐⭐           │
└─────────────────────┘
  ↓
Intermediate
  ↓
┌─────────────────────┐
│ Both Modes          │
│ Per Kata: Fluency   │
│ Per Huruf: Names    │
│ ⭐⭐⭐⭐⭐ + ⭐     │
└─────────────────────┘
  ↓
Expert
  ↓
┌─────────────────────┐
│ Strategic Use       │
│ Use best mode       │
│ For each situation  │
│ ⭐⭐⭐⭐⭐⭐⭐⭐⭐│
└─────────────────────┘
```

---

## 🎯 Feature Comparison Grid

```
╔═══════════════════════════════════════════════════════════════╗
║           FEATURE COMPARISON MATRIX                           ║
╠═══════════════════╦═══════════════╦═══════════════════════════╣
║ Feature           ║ Per Kata      ║ Per Huruf                 ║
╠═══════════════════╬═══════════════╬═══════════════════════════╣
║ Split Method      ║ By Spaces     ║ By Character              ║
║ Example           ║ HALO SAYA=2   ║ HALO=4                    ║
║ Speed             ║ ⚡⚡⚡ Fast  ║ 🐢🐢 Slow                 ║
║ Use Case          ║ Conversation  ║ Spelling                  ║
║ Cards for HALO    ║ 1             ║ 4                         ║
║ Vocabulary        ║ 60+ Words     ║ 26 Letters                ║
║ Natural?          ║ ✅ YES        ║ ❌ NO                     ║
║ Fluency Rating    ║ ⭐⭐⭐⭐⭐   ║ ⭐                         ║
║ Precision Rating  ║ ⭐⭐         ║ ⭐⭐⭐⭐⭐               ║
╚═══════════════════╩═══════════════╩═══════════════════════════╝
```

---

## 🎨 Button State Visualization

### Inactive State

```
┌────────────────────────────────────┐
│ 🎯 Pilih Mode:                     │
│                                    │
│ ┌──────────────┐ ┌──────────────┐ │
│ │ 📝 Per Kata  │ │🔤 Per Huruf  │ │
│ │              │ │  (Gray)      │ │
│ │  (Gray)      │ │              │ │
│ └──────────────┘ └──────────────┘ │
│                                    │
└────────────────────────────────────┘
```

### Active State (Per Kata)

```
┌────────────────────────────────────┐
│ 🎯 Pilih Mode:                     │
│                                    │
│ ┌──────────────┐ ┌──────────────┐ │
│ │ 📝 Per Kata  │ │🔤 Per Huruf  │ │
│ │              │ │  (Gray)      │ │
│ │  (Blue)✓     │ │              │ │
│ │ with glow    │ │              │ │
│ └──────────────┘ └──────────────┘ │
│                                    │
└────────────────────────────────────┘
```

### Active State (Per Huruf)

```
┌────────────────────────────────────┐
│ 🎯 Pilih Mode:                     │
│                                    │
│ ┌──────────────┐ ┌──────────────┐ │
│ │ 📝 Per Kata  │ │🔤 Per Huruf  │ │
│ │  (Gray)      │ │  (Blue)✓     │ │
│ │              │ │ with glow    │ │
│ └──────────────┘ └──────────────┘ │
│                                    │
└────────────────────────────────────┘
```

---

## 📊 Processing Pipeline

### Per Kata Pipeline

```
User Input
    │
    ↓
┌─────────────────────┐
│ inputText.trim()    │
└─────────────────────┘
    │
    ↓
┌─────────────────────┐
│ .split(/\s+/)       │ ← Split by whitespace
└─────────────────────┘
    │
    ↓
┌─────────────────────┐
│ Map to Gestures     │
│ {text, videoUrl,    │
│  label}             │
└─────────────────────┘
    │
    ↓
Gesture Cards
```

### Per Huruf Pipeline

```
User Input
    │
    ↓
┌─────────────────────┐
│ .toUpperCase()      │
└─────────────────────┘
    │
    ↓
┌─────────────────────┐
│ .split("")          │ ← Split by character
└─────────────────────┘
    │
    ↓
┌─────────────────────┐
│ .filter(c =>        │
│  c !== " ")         │ ← Remove spaces
└─────────────────────┘
    │
    ↓
┌─────────────────────┐
│ Map to Gestures     │
│ {text, videoUrl,    │
│  label}             │
└─────────────────────┘
    │
    ↓
Gesture Cards
```

---

## 🎯 Real-World Scenarios

### Scenario 1: Classroom Vocabulary Lesson

```
BEFORE (Per Kata only):
┌─────────────────────┐
│ Teacher says:       │
│ "AYAH IBU KAKAK"    │
│ → 3 gesture cards   │
│ Students learn 3    │
│ vocabulary words    │
└─────────────────────┘

AFTER (Dual Mode):
┌─────────────────────┐
│ Teacher switches    │
│ to Per Huruf for    │
│ spelling practice   │
│ of difficult words  │
│ More flexibility!   │
└─────────────────────┘
```

---

### Scenario 2: International Communication

```
Signing with Deaf Friend:

"BAGAIMANA KABAR MU"
│
├─ Per Kata:
│  [BAGAIMANA][KABAR][MU]
│  3 cards, natural pace ⚡
│
└─ If unclear:
   Switch to Per Huruf
   "BAGAIMANA" → 9 letters
   Spell it out for clarity
```

---

### Scenario 3: Name Introduction

```
"NAMA SAYA SARAH"

OPTION 1 - Per Kata:
[NAMA][SAYA][SARAH]
Problem: SARAH not in vocabulary

OPTION 2 - Per Huruf (switch):
[NAMA][SAYA][S][A][R][A][H]
Solution: Spell name letter by letter ✅
```

---

## 🎉 Visual Summary

```
┌─────────────────────────────────────────────────────┐
│                  DUAL MODE SYSTEM                   │
│                                                     │
│              TEXT-TO-SIGN CONVERTER                 │
│                      │                              │
│    ┌────────────────┴─────────────────┐            │
│    │                                  │            │
│  Per Kata                         Per Huruf        │
│  ┌──────────────────┐            ┌─────────────┐  │
│  │ Word-based       │            │ Letter-based│  │
│  │ HALO SAYA = 2    │            │ HALO = 4    │  │
│  │ Split(/\s+/)    │            │ Split("")   │  │
│  │ Fast ⚡⚡⚡      │            │ Slow 🐢🐢  │  │
│  │ Natural ✅       │            │ Spelling ✅  │  │
│  │ Conversation     │            │ Names       │  │
│  │ Vocabulary       │            │ Letters     │  │
│  └──────────────────┘            └─────────────┘  │
│    │                                  │            │
│    └────────────────┬─────────────────┘            │
│                     │                              │
│                  Results:                          │
│              Gesture Cards                         │
│                     │                              │
│                  Play/Review                       │
│                                                     │
└─────────────────────────────────────────────────────┘

Status: ✅ READY TO USE
```

---

**Last Updated**: February 5, 2026
**Version**: 2.0 (Dual Mode)
**Status**: ✅ Complete
