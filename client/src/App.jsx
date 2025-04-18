import { useState } from 'react'

function App() {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    console.log(message);
    alert('Submitted!');
  }

  return (
    <div className = "flex flex-col">
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
