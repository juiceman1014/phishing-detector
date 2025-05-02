import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import TextSubmitPage from "./pages/textSubmitPage";
import FileUploadPage from "./pages/fileUploadPage";
import SavedMessagesPage from "./pages/savedMessagesPage";
import Navbar from "./components/navbar";

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/text" element={<TextSubmitPage />} />
        <Route path="/upload" element={<FileUploadPage />} />
        <Route path="/saved" element={<SavedMessagesPage />} />
      </Routes>
    </Router>
  );
}

export default App
