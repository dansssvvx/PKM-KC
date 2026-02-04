from flask import Flask, jsonify
import os

# Serve `web/` as the static folder
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
WEB_FOLDER = os.path.join(PROJECT_ROOT, 'web')

app = Flask(__name__, static_folder=WEB_FOLDER, static_url_path='')

@app.route('/')
def index():
    # Sends web/index.html
    return app.send_static_file('index.html')

@app.route('/health')
def health():
    return jsonify(status='ok')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
