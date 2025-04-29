import { Link } from "react-router-dom";

const HomePage = () => {
    
    return (
        <div className = "flex flex-col justify-evenly items-center h-screen">
            <h1>Welcome to the Phishing Detector</h1>
            <Link to="/text">
                <button>Submit Text</button>
            </Link>
            <Link to="/upload">
                <button>Upload File</button>
            </Link>
        </div>
    );
}

export default HomePage;