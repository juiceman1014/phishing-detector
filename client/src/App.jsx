import { useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('');

  return (
    <div className = "app-container">
      <h1>Phishing Detector</h1>
      <textarea 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your suspicious message"
      />
      <button>Submit</button>
    </div>
  )
}

export default App
