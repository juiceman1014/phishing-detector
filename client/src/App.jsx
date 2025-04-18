import { useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    console.log(message);
    alert('Submitted!');
  }

  return (
    <div className = "app-container">
      <h1>Phishing Detector</h1>
      <textarea 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your suspicious message"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default App
