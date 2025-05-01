import axios from 'axios';
import { useState } from 'react'

const TextSubmitPage = () => {
  const [message, setMessage] = useState("");
  const [highlighted, setHighlighted] = useState("");

  const handleSubmit = async () => {
    try{
      const res = await axios.post("http://localhost:8000/analyze", {
        message: message,
      });

      console.log("Server response: ", res.data)

      alert(`Submitted! Server recieved: "${res.data.message}"`);

      if(res.data.is_phishing){
        alert("This message is likely a phishing attempt!");
      }else{
        alert("This message is legit!");
      }

      setHighlighted(res.data.highlighted);
    } catch(err){
      console.error("Error submitting message:", err);
      alert("Submission failed!");
    }
  };

  return (
    <div className = "flex flex-col justify-evenly items-center h-screen">
      <textarea 
        className = "h-[350px] w-[350px]"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your suspicious message"
      />
      <button onClick={handleSubmit}>Submit</button>

      {highlighted && (
        <div>
          <h2>Here's what we flagged as phishing!</h2>
          <div dangerouslySetInnerHTML={{__html: highlighted}}/>
        </div>
      )}
    </div>
  )
}

export default TextSubmitPage;
