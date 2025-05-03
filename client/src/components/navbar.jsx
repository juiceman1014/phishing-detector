import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <ul className="flex justify-center gap-6">
        <li>
          <Link to="/">
            <button className="hover:bg-blue-700 px-4 py-2 rounded transition">
              Home
            </button>
          </Link>
        </li>
        <li>
          <Link to="/text">
            <button className="hover:bg-blue-700 px-4 py-2 rounded transition">
              Text Submit
            </button>
          </Link>
        </li>
        <li>
          <Link to="/upload">
            <button className="hover:bg-blue-700 px-4 py-2 rounded transition">
              Upload File
            </button>
          </Link>
        </li>
        <li>
          <Link to="/saved">
            <button className="hover:bg-blue-700 px-4 py-2 rounded transition">
              Saved Messages
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
