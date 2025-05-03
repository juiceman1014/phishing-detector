import axios from 'axios';
import { useState } from 'react'

const FileUploadPage = () => {
  const [highlighted, setHighlighted] = useState("");

  const handleFileUpload = async (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);

    try{
      const res = await axios.post("http://localhost:8000/scan-file", formData);
      
      if(res.data.is_phishing){
        alert("This message is likely a phishing attempt!");
      }else{
        alert("This message is legit!");
      }

      setHighlighted(res.data.highlighted);
    } catch(err){
      console.error(err);
      alert("failed to scan the file.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center px-4 py-8">
      <h2 className="text-3xl font-semibold text-blue-700 mb-6">Upload a File to Scan</h2>

      <label className="cursor-pointer bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition mb-6">
        <input
          type="file"
          onChange={handleFileUpload}
          className="hidden"
        />
        Choose File
      </label>

      {highlighted && (
        <div className="mt-6 max-w-xl bg-white p-6 rounded-lg shadow-md border border-blue-200">
          <h3 className="text-lg font-medium text-blue-700 mb-2">Here's what we flagged as phishing:</h3>
          <div className="text-gray-800" dangerouslySetInnerHTML={{ __html: highlighted }} />
        </div>
      )}
    </div>
  );
};

export default FileUploadPage;