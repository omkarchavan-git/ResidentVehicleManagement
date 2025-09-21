import { Link } from "react-router-dom";
import "./Navbar.css"; // import css

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">Vehicle Management</div>

        {/* Navigation Links */}
        <div className="nav-links">
          <Link to="/resident" className="nav-item">Resident</Link>
          <Link to="/visitor" className="nav-item">Visitor</Link>
          <Link to="/vehicle" className="nav-item">Vehicle</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
