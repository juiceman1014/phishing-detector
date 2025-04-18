import { useState } from 'react'

function App() {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    console.log(message);
    alert('Submitted!');
  }

  return (
    <div className = "flex flex-col justify-evenly items-center h-screen">
      <h1>Phishing Detector</h1>
      <textarea 
        className = "h-[350px] w-[350px]"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your suspicious message"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default App
