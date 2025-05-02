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
    <div className = "flex flex-col justify-evenly items-center h-screen">
      {messages.length === 0 ? (
        <p>No messsages saved yet.</p>
      ) : (
        <div>
            <ul>
                {messages.map((msg, idx) => (
                    <li key={idx}>
                        <p>Message: {msg.message}</p>
                        <p>Phishing: {msg.is_phishing === true ? "Yes" : msg.is_phishing === false ? "No" : "Not analyzed"}</p>
                        <p>Saved at: {new Date(msg.timestamp).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
            <button onClick={handleClear}>Clear All</button>
        </div>
      )}
    </div>
  )
}

export default SavedMessagesPage;
