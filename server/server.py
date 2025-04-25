from flask import Flask, request, jsonify
from flask_cors import CORS
import re

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

if __name__ == "__main__":
    app.run(debug=True, port=8000)