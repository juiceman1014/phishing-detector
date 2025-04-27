from flask import Flask, request, jsonify
from flask_cors import CORS
import re
import textract
import tempfile

app = Flask(__name__)
CORS(app)

def is_phishing(message):
    msg = message.lower()
    score = 0

    keywords = ["urgent", "click here", "limited time"]
    score += sum(kw in msg for kw in keywords)

    if re.search(r"https?://", msg):
        score += 1
    
    if message.count("!") > 3:
        score += 1

    return score >= 3
    
@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    message = data.get("message", "")
    phishing = is_phishing(message)

    print("Received message:", message)
    return jsonify({"status": "received", "message":message, "is_phishing":phishing})

@app.route("/scan-file", methods=["POST"])
def scan_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    try:
        with tempfile.NamedTemporaryFile(delete=False) as temp:
            file.save(temp.name)
            content = textract.process(temp.name).decode('utf-8', errors='ignore')

        phishing = is_phishing(content)

        return jsonify({
            "status":"received",
            "is_phishing":phishing,
            "content_excerpt": content[:500]
        })
    except Exception as e:
        print("Error processing file:", e)
        return jsonify({"error": "Failed to process file"}), 500

if __name__ == "__main__":
    app.run(debug=True, port=8000)