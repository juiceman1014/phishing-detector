import { useEffect, useState } from 'react'

const SavedMessagesPage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedMessages") || "[]");
    setMessages(saved);
  }, []);

  const handleClear = () => {
    localStorage.removeItem("savedMessages");
    setMessages([]);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center px-4 py-8">
      <h2 className="text-3xl font-semibold text-blue-700 mb-8">Saved Messages</h2>

      {messages.length === 0 ? (
        <p className="text-gray-600 text-lg">No messages saved yet.</p>
      ) : (
        <div className="w-full max-w-3xl space-y-6">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className="bg-white border border-blue-200 p-6 rounded-lg shadow-md"
            >
              <p className="text-gray-800"><span className="font-semibold text-blue-600">Message:</span> {msg.message}</p>
              <p className="text-gray-800">
                <span className="font-semibold text-blue-600">Phishing:</span>{' '}
                {msg.is_phishing === true
                  ? 'Yes'
                  : msg.is_phishing === false
                  ? 'No'
                  : 'Not analyzed'}
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Saved at: {new Date(msg.timestamp).toLocaleString()}
              </p>
            </div>
          ))}

          <div className="flex justify-center">
            <button
              onClick={handleClear}
              className="bg-red-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-600 transition"
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedMessagesPage;
