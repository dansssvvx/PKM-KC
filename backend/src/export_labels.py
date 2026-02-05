import pickle
import json
import os

PICKLE_PATH = os.path.join('model', 'label_encoder.pkl')
OUT_PATH = os.path.join('web', 'model', 'labels.json')

if not os.path.exists(PICKLE_PATH):
    print(f"Error: {PICKLE_PATH} not found. Train model first or provide label encoder.")
    raise SystemExit(1)

with open(PICKLE_PATH, 'rb') as f:
    le = pickle.load(f)

labels = []
if hasattr(le, 'classes_'):
    labels = list(le.classes_)
elif isinstance(le, (list, tuple)):
    labels = list(le)
else:
    # try to coerce
    try:
        labels = list(le)
    except Exception as e:
        print('Could not extract labels from label encoder:', e)
        raise

os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)
with open(OUT_PATH, 'w', encoding='utf-8') as f:
    json.dump(labels, f, ensure_ascii=False, indent=2)

print(f"Saved {len(labels)} labels to {OUT_PATH}")
