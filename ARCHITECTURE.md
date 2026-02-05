# SignTalk Architecture & Feature Flow

## 🏗️ Application Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         SignTalk App                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    Header Component                      │   │
│  │              🤟 SignTalk | SIBI/BISINDO                 │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              ModeSelector Component                      │   │
│  │         [👋 Sign to Bahasa] | [📝 Text to Sign]        │   │
│  └──────────────────────────────────────────────────────────┘   │
│                          ↓ (mode state)                         │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              Conditional Rendering                       │   │
│  ├────────────────────────────────────────────────────────────┤ │
│  │  If mode === "sign-to-text":                            │   │
│  │  ┌─────────────────────────────────────────────────────┐ │   │
│  │  │ Grid Layout (2 columns)                             │ │   │
│  │  ├─────────────────────────────────────────────────────┤ │   │
│  │  │ Left Column:                                        │ │   │
│  │  │  ┌──────────────────────────────────────────────┐  │ │   │
│  │  │  │    Translator Component                      │  │ │   │
│  │  │  │  ┌──────────────────────────────────────┐   │  │ │   │
│  │  │  │  │  HandDetector (MediaPipe)            │   │  │ │   │
│  │  │  │  │  - Camera Feed                        │   │  │ │   │
│  │  │  │  │  - Landmark Detection                │   │  │ │   │
│  │  │  │  │  - Feature Extraction (126)          │   │  │ │   │
│  │  │  │  └──────────────────────────────────────┘   │  │ │   │
│  │  │  │           ↓ (Landmarks)                     │  │ │   │
│  │  │  │  ┌──────────────────────────────────────┐   │  │ │   │
│  │  │  │  │  API: sendLandmarks()                │   │  │ │   │
│  │  │  │  │  POST /predict (Flask Backend)       │   │  │ │   │
│  │  │  │  └──────────────────────────────────────┘   │  │ │   │
│  │  │  └──────────────────────────────────────────────┘  │ │   │
│  │  │                                                    │ │   │
│  │  │ Right Column:                                      │ │   │
│  │  │  ┌──────────────────────────────────────────────┐  │ │   │
│  │  │  │    ResultBox Component                      │  │ │   │
│  │  │  │  - Gesture Label                            │  │ │   │
│  │  │  │  - Confidence Bar (colored)                 │  │ │   │
│  │  │  │  - Text-to-Speech Button                    │  │ │   │
│  │  │  │  - History (last 5)                         │  │ │   │
│  │  │  └──────────────────────────────────────────────┘  │ │   │
│  │  └─────────────────────────────────────────────────────┘ │   │
│  │                                                         │   │
│  │  Else (mode === "text-to-sign"):                      │   │
│  │  ┌─────────────────────────────────────────────────────┐ │   │
│  │  │    TextToSign Component (Full Width)                │ │   │
│  │  │  ┌──────────────────────────────────────────────┐  │ │   │
│  │  │  │  Input Section:                             │  │ │   │
│  │  │  │  ┌──────────────────────────────────────┐   │  │ │   │
│  │  │  │  │  Text Input Textarea                 │   │  │ │   │
│  │  │  │  │  [Konversi ke Gesture] Button        │   │  │ │   │
│  │  │  │  └──────────────────────────────────────┘   │  │ │   │
│  │  │  │           ↓ (Text)                          │  │ │   │
│  │  │  │  ┌──────────────────────────────────────┐   │  │ │   │
│  │  │  │  │  Processing:                         │   │  │ │   │
│  │  │  │  │  - Split to Characters               │   │  │ │   │
│  │  │  │  │  - Map to Gestures (from constants)  │   │  │ │   │
│  │  │  │  │  - Build Gesture Cards               │   │  │ │   │
│  │  │  │  └──────────────────────────────────────┘   │  │ │   │
│  │  │  │           ↓ (Gesture List)                  │  │ │   │
│  │  │  │  ┌──────────────────────────────────────┐   │  │ │   │
│  │  │  │  │  Gesture Grid Preview:               │   │  │ │   │
│  │  │  │  │  [A] [L] [O] [S]                     │   │  │ │   │
│  │  │  │  │  Each card shows:                    │   │  │ │   │
│  │  │  │  │  - Character                         │   │  │ │   │
│  │  │  │  │  - Label                             │   │  │ │   │
│  │  │  │  │  - Video Placeholder                 │   │  │ │   │
│  │  │  │  └──────────────────────────────────────┘   │  │ │   │
│  │  │  │           ↓ (Gesture Cards)                 │  │ │   │
│  │  │  │  ┌──────────────────────────────────────┐   │  │ │   │
│  │  │  │  │  [Putar Animasi] Button              │   │  │ │   │
│  │  │  │  │  - Plays video sequence              │   │  │ │   │
│  │  │  │  │  - 1 second per gesture              │   │  │ │   │
│  │  │  │  └──────────────────────────────────────┘   │  │ │   │
│  │  │  │                                              │  │ │   │
│  │  │  │  ┌──────────────────────────────────────┐   │  │ │   │
│  │  │  │  │  Transcription Box:                  │   │  │ │   │
│  │  │  │  │  📋 Teks Asli: [Original Text]       │   │  │ │   │
│  │  │  │  └──────────────────────────────────────┘   │  │ │   │
│  │  │  └──────────────────────────────────────────────┘  │ │   │
│  │  └─────────────────────────────────────────────────────┘ │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    Footer Component                      │   │
│  │           (Dynamic tips based on active mode)            │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow Diagram

### Mode 1: Sign-to-Bahasa (Left Side)

```
Camera/Webcam
    ↓ (video stream)
HandDetector Component
    ├─ MediaPipe Hands JS (CDN)
    ├─ Canvas rendering (double-buffered)
    └─ Real-time landmark extraction
    ↓ (21-point landmarks × 2 hands)
Translator Component
    ├─ Receives landmarks callback
    ├─ buildTwoHandFeatures() → 126-element array
    └─ throttled (500ms) sendLandmarks() call
    ↓ (JSON: {landmarks: [126 floats]})
Flask Backend (/predict endpoint)
    ├─ Load model: gesture_classifier.keras
    ├─ Load encoder: label_encoder.pkl
    ├─ Run TensorFlow inference
    └─ Return {index, label, confidence}
    ↓ (JSON response)
ResultBox Component
    ├─ Parse result string
    ├─ Display label (large font)
    ├─ Show confidence bar (color-coded)
    ├─ Add to history (max 5 items)
    ├─ Text-to-Speech button
    └─ Copy to clipboard button
    ↓
User sees gesture translation in real-time
```

### Mode 2: Text-to-Sign (Full Width)

```
User Input (Textarea)
    ↓ (text string)
"Konversi ke Gesture" Button Click
    ↓
handleConvertText() function
    ├─ Validate input (non-empty)
    ├─ Set loading state = true
    └─ Try-catch error handling
    ↓
Split text to characters
    ├─ toUpperCase()
    ├─ split("")
    └─ Create array of chars
    ↓
Map each character to gesture
    ├─ Look up in GESTURE_LABELS constant
    ├─ Get video path: /gestures/{CHAR}.mp4
    └─ Create gesture objects
    ↓
Gesture Grid Component (Responsive)
    ├─ CSS Grid (auto-fill, min-width: 120px)
    ├─ Gesture cards with hover animation
    ├─ Character display (large, green)
    ├─ Label display (small, gray)
    └─ Video placeholder (📹)
    ↓
"Putar Animasi" Button Click
    ↓
handlePlaySequence() function
    ├─ Loop through gestures
    ├─ Play video for each gesture
    ├─ 1000ms delay between gestures
    └─ Optional: visual progress indicator
    ↓
Video sequence plays
    ├─ A (1s)
    ├─ L (1s)
    ├─ O (1s)
    └─ S (1s)
    ↓
User sees gesture animation sequence
```

## 🗂️ Component Hierarchy

```
App
├── Header
├── ModeSelector
│   ├── Button (Sign to Bahasa)
│   └── Button (Text to Sign)
└── MainContent (conditional)
    ├── MODE: "sign-to-text"
    │   ├── Grid (2 columns)
    │   ├── Left Column:
    │   │   ├── Translator
    │   │   │   ├── HandDetector
    │   │   │   │   ├── Canvas (offscreen)
    │   │   │   │   ├── Canvas (display)
    │   │   │   │   └── MediaPipe Camera
    │   │   │   └── API calls to /predict
    │   │   └── Camera permission UI
    │   └── Right Column:
    │       └── ResultBox
    │           ├── Label display
    │           ├── Confidence bar
    │           ├── TTS button
    │           ├── Copy button
    │           └── History list
    │
    └── MODE: "text-to-sign"
        ├── Input section
        │   ├── Textarea
        │   └── Convert button
        ├── Gesture preview section
        │   ├── Gesture grid
        │   │   ├── Gesture card (repeating)
        │   │   ├── Character display
        │   │   ├── Label
        │   │   └── Video placeholder
        │   ├── Play animation button
        │   └── Transcription box
        └── Help section (if no gestures)
            ├── Usage instructions
            └── 4-step guide
└── Footer
    └── Dynamic tips
```

## 📊 State Management

### App.jsx (Root State)
```javascript
const [result, setResult] = useState("");      // "A (85.5%)"
const [mode, setMode] = useState("sign-to-text"); // Mode selector
```

### Translator.jsx
```javascript
// Receives: setResult, onLandmarksDetected
// Manages: landmark detection callbacks
```

### TextToSign.jsx
```javascript
const [inputText, setInputText] = useState("");           // User text
const [selectedGestures, setSelectedGestures] = useState([]); // Mapped
const [loading, setLoading] = useState(false);            // Button state
const [error, setError] = useState(null);                 // Error msg
```

### ResultBox.jsx
```javascript
// Receives: text prop (from App)
// Manages: history state, confidence parsing
```

## 🔌 API Interfaces

### Backend: POST /predict
**Request:**
```json
{
  "landmarks": [
    x1_hand1, y1_hand1, z1_hand1,
    x2_hand1, y2_hand1, z2_hand1,
    ...
    x21_hand1, y21_hand1, z21_hand1,
    x1_hand2, y1_hand2, z1_hand2,
    ...
    x21_hand2, y21_hand2, z21_hand2
  ]
}
```

**Response:**
```json
{
  "index": 0,
  "label": "A",
  "confidence": 0.855
}
```

### Frontend: Constants (gestures.js)
```javascript
GESTURE_LABELS = {
  "A": "A - Tangan menggenggam",
  "B": "B - Jari rapat",
  ...
}

GESTURE_VIDEO_PATHS = {
  "A": "/gestures/A.mp4",
  "B": "/gestures/B.mp4",
  ...
}
```

## 🎨 CSS Architecture

### Global Styles (App.css)
- Header with gradient
- Grid layout (1fr 1fr or 1fr depending on mode)
- Footer styling
- Responsive breakpoints

### Component-Specific Styles
- `textToSign.css`: Input, buttons, grid, cards, animations
- `modeSelector.css`: Mode buttons, divider, active states
- `resultBox.css`: Card, confidence bar, history
- `handDetector.css`: Canvas styling

### Design System
- **Primary Color**: #22c55e (green)
- **Secondary Color**: #3b82f6 (blue)
- **Spacing**: 8px, 12px, 16px, 20px, 24px, 30px
- **Animations**: fadeIn, slideInDown, transforms
- **Breakpoints**: 1024px, 768px, 640px, 480px

## 🚀 Performance Considerations

### Sign-to-Text Mode
- **Canvas Rendering**: Double-buffering + 15 FPS cap
- **Landmark Sending**: 500ms throttle
- **Inference**: Server-side (less client overhead)

### Text-to-Sign Mode
- **Grid Rendering**: CSS Grid (GPU accelerated)
- **Video Playback**: Native browser <video> (efficient)
- **Animation**: CSS transforms (smooth 60 FPS possible)

## 📱 Responsive Design Strategy

### Desktop (>1024px)
- 2-column grid for Sign-to-Text
- Full-width container for Text-to-Sign
- All UI labels visible

### Tablet (768-1024px)
- Single column for Sign-to-Text (stack vertically)
- Full-width input for Text-to-Sign
- Reduced gaps and padding

### Mobile (<768px)
- Single column layout
- Smaller fonts and buttons
- Touch-friendly button sizing (44px min height)

### Small Mobile (<480px)
- Icon-only mode buttons
- 2-column gesture grid
- Single column everything else
- No unnecessary labels

## 🔗 Integration Points

Ready for:
1. ✅ Video file storage (public/gestures/)
2. ✅ Video playback in gesture cards
3. ✅ Backend gesture API endpoint
4. ✅ Database gesture metadata
5. ✅ Gesture suggestion/autocomplete
6. ✅ Speech-to-text input

---

This architecture supports both unidirectional (sign→text) and bidirectional (text↔sign) translation with smooth UX and performance optimization.
