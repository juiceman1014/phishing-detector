import axios from 'axios';
import { useState } from 'react'

const TextSubmitPage = () => {
  const [message, setMessage] = useState("");
  const [highlighted, setHighlighted] = useState("");
  const [isPhishing, setIsPhishing] = useState(null);

  const handleSubmit = async () => {
    try{
      const res = await axios.post("http://localhost:8000/scan-text", {
        message: message,
      });

      console.log("Server response: ", res.data)

      if(res.data.is_phishing){
        alert("This message is likely a phishing attempt!");
      }else{
        alert("This message is legit!");
      }

      setHighlighted(res.data.highlighted);
      setIsPhishing(res.data.is_phishing);
    } catch(err){
      console.error("Error submitting message:", err);
      alert("Submission failed!");
    }
  };

  const handleSave = () => {
    const existing = JSON.parse(localStorage.getItem("savedMessages") || "[]");

    const newEntry = {
      message,
      is_phishing: isPhishing,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem("savedMessages", JSON.stringify([...existing, newEntry]));
    alert("Message saved locally!");
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center px-4 py-8">
      <h2 className="text-3xl font-semibold text-blue-700 mb-6">Submit a Suspicious Message</h2>

      <textarea
        className="h-48 w-full max-w-md p-4 border border-blue-300 rounded-md shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your suspicious message here..."
      />

      <div className="mt-4 flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition cursor-pointer"
        >
          Submit
        </button>

        <button
          onClick={handleSave}
          disabled={message.trim() === ""}
          className={`px-6 py-2 rounded-md shadow-md transition ${
            message.trim() === ""
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-teal-500 text-white hover:bg-teal-600 cursor-pointer"
          }`}
        >
          Save Message
        </button>
      </div>

      {highlighted && (
        <div className="mt-8 max-w-xl bg-white p-6 rounded-lg shadow-md border border-blue-200">
          <h3 className="text-lg font-medium text-blue-700 mb-2">Here's what we flagged as phishing:</h3>
          <div className="text-gray-800" dangerouslySetInnerHTML={{ __html: highlighted }} />
        </div>
      )}
    </div>
  );
};

export default TextSubmitPage;
