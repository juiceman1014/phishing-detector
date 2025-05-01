import axios from 'axios';

const FileUploadPage = () => {

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
    } catch(err){
      console.error(err);
      alert("failed to scan the file.");
    }
  };

  return (
    <div className = "flex flex-col justify-evenly items-center h-screen">
      <input type="file" onChange={handleFileUpload}/>
    </div>
  )
}

export default FileUploadPage;
