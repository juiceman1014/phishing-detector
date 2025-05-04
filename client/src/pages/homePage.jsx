import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-12 drop-shadow-sm text-center">
        Welcome to the Phishing Detector
      </h1>

      <div className="space-y-6">
        <Link to="/text">
          <button className="w-48 bg-blue-500 text-white py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-200 cursor-pointer">
            Submit Text
          </button>
        </Link>

        <Link to="/upload">
          <button className="w-48 bg-cyan-500 text-white py-3 rounded-lg shadow-md hover:bg-cyan-600 transition duration-200 cursor-pointer">
            Upload File
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
