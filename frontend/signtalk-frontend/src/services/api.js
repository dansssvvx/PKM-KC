const API_URL = "http://localhost:5000/predict";

// Send 2-hand landmarks (126 features) to server
export const sendLandmarks = async (landmarks) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ landmarks })
  });

  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }

  return response.json();
};

// Build 2-hand features (21 landmarks * 3 coords * 2 hands = 126)
export const buildTwoHandFeatures = (multiHandLandmarks) => {
  const NUM_FEATURES = 21 * 3 * 2; // 126
  const half = NUM_FEATURES / 2; // 63
  const features = new Array(NUM_FEATURES).fill(0);

  if (!multiHandLandmarks || multiHandLandmarks.length === 0) return features;

  // hand1
  if (multiHandLandmarks.length >= 1) {
    const h1 = multiHandLandmarks[0].flatMap(lm => [lm.x, lm.y, lm.z]);
    for (let i = 0; i < Math.min(h1.length, half); i++) {
      features[i] = h1[i];
    }
  }
  // hand2
  if (multiHandLandmarks.length >= 2) {
    const h2 = multiHandLandmarks[1].flatMap(lm => [lm.x, lm.y, lm.z]);
    for (let i = 0; i < Math.min(h2.length, half); i++) {
      features[half + i] = h2[i];
    }
  }
  return features;
};

