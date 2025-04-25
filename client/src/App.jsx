import axios from 'axios';
import { useState } from 'react'

function App() {
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    try{
      const res = await axios.post("http://localhost:8000/analyze", {
        message: message,
      });

      console.log("Server response: ", res.data);

      alert(`Submitted! Server recieved: "${res.data.message}"`);

      if(res.data.is_phishing){
        alert("This message is likely a phishing attempt!")
      }else{
        alert("This message is legit!")
      }
      
    } catch(err){
      console.error("Error submitting message:", err);
      alert("Submission failed!");
    }
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
