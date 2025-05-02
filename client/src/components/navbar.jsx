import { Link } from "react-router-dom"

const Navbar = () => {
    
    return (
        <nav>
            <Link to="/">
                <button>Home</button>
            </Link>
            <Link to="/text">
                <button>Text Submit</button>
            </Link>
            <Link to="/upload">
                <button>Upload File</button>
            </Link>
            <Link to="/saved">
                <button>Saved Messages</button>
            </Link>
        </nav>
    );
}

export default Navbar;