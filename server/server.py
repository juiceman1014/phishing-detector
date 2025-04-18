from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    message = data.get("message", "")
    print("Received message:", message)
    return jsonify({"status": "received", "message":message})

if __name__ == "__main__":
    app.run(debug=True, port=8000)