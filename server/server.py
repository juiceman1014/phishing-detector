from flask import Flask, request, jsonify
from flask_cors import CORS
import re
import textract
import tempfile
from html_sanitizer import Sanitizer

app = Flask(__name__)
CORS(app)

sanitizer = Sanitizer({
    'tags': ['mark'],
    'attributes': {},
    'empty': [],
    'separate': []
})

def is_phishing(message):
    msg = message.lower()
    score = 0
    
    # Expanded list of suspicious keywords and phrases
    keywords = [
        "urgent", "click here", "limited time", "account suspended", "verify your account",
        "update your information", "security alert", "unusual activity", "confirm your details",
        "login attempt", "prize", "winner", "lottery", "inheritance", "claim your reward",
        "password expired", "suspicious activity", "unauthorized access"
    ]
    score += sum(kw in msg for kw in keywords)
    
    # Enhanced URL checks
    urls = re.findall(r'https?://(?:[-\w.]|(?:%[\da-fA-F]{2}))+', msg)
    if urls:
        score += 1
        
        # Check for IP addresses in URLs instead of domain names
        if re.search(r'https?://\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}', msg):
            score += 2
        
        # Check for URL shorteners
        shorteners = ["bit.ly", "tinyurl", "goo.gl", "t.co", "is.gd", "ow.ly"]
        if any(short in url for short in shorteners for url in urls):
            score += 1
    
    # Check for excessive punctuation
    if message.count("!") > 3:
        score += 1
    
    # Check for urgency indicators
    urgency_phrases = ["act now", "limited offer", "expires soon", "immediate action", "today only"]
    score += sum(phrase in msg for phrase in urgency_phrases)
    
    # Check for sensitive information requests
    sensitive_requests = ["ssn", "social security", "password", "credit card", "bank account", 
                         "pin", "mother's maiden name", "birth date", "passport"]
    score += sum(info in msg for info in sensitive_requests) * 2
    
    # Check for poor grammar and spelling
    grammar_indicators = ["kindly", "gud", "ur", "plz", "pls", "u ", " r ", "dear customer", "dear user"]
    if sum(indicator in msg for indicator in grammar_indicators) > 1:
        score += 1
    
    # Check for common phishing phrases
    common_phrases = ["verify your identity", "confirm your information", "update your account",
                     "your account has been suspended", "unusual activity detected"]
    score += sum(phrase in msg for phrase in common_phrases)
    
    return score >= 3

def highlight_phishing_indicators(message):
    indicators = [
        "urgent", "click here", "limited time", "account suspended", "verify your account",
        "update your information", "security alert", "unusual activity", "confirm your details",
        "login attempt", "prize", "winner", "lottery", "inheritance", "claim your reward",
        "password expired", "suspicious activity", "unauthorized access",
        "act now", "limited offer", "expires soon", "immediate action", "today only",
        "ssn", "social security", "password", "credit card", "bank account",
        "pin", "mother's maiden name", "birth date", "passport",
        "kindly", "gud", "ur", "plz", "pls", "u ", " r ", "dear customer", "dear user",
        "verify your identity", "confirm your information", "update your account",
        "your account has been suspended", "unusual activity detected"
    ]

    escaped = [re.escape(kw) for kw in sorted(indicators, key=len, reverse=True)]
    print(escaped)
    pattern = re.compile(r'(' + '|'.join(escaped) + r')', flags=re.IGNORECASE)
    print(pattern)

    highlighted = pattern.sub(r'<mark>\1</mark>', message)
    print(highlighted)

    if message.count("!") > 3:
        highlighted = highlighted.replace("!", "<mark>!</mark>")
    
    highlighted = re.sub(r'(https:?//[^\s]+)', r'<mark>\1</mark>', highlighted)

    return sanitizer.sanitize(highlighted)
    
@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    message = data.get("message", "")
    phishing = is_phishing(message)
    highlighted = highlight_phishing_indicators(message) if phishing else ""

    print("Received message:", message)
    return jsonify({
        "status": "received", 
        "message":message, 
        "highlighted": highlighted, 
        "is_phishing":phishing
    })

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
        highlighted = highlight_phishing_indicators(content) if phishing else ""

        return jsonify({
            "status":"received",
            "is_phishing":phishing,
            "highlighted": highlighted[:500]
        })
    except Exception as e:
        print("Error processing file:", e)
        return jsonify({"error": "Failed to process file"}), 500

if __name__ == "__main__":
    app.run(debug=True, port=8000)