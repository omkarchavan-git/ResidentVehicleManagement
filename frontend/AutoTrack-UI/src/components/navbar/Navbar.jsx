import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/" className="nav-item">Vehicle Management</Link>
        </div>

        {/* Navigation Links */}
        <div className="nav-links">
          {/* Resident with Dropdown */}
          <div className="dropdown">
            <Link to="/resident/Resident" className="nav-item">Resident</Link>
            <div className="dropdown-content">
              <Link to="/resident/AddResident">Add Resident</Link>
              <Link to="/resident/list">Update Resident</Link>
              <Link to="/resident/payments">Payments</Link>
              <Link to="/resident/settings">Settings</Link>
            </div>
          </div>

          {/* Normal links */}
          <Link to="/visitor" className="nav-item">Visitor</Link>
          <Link to="/vehicle" className="nav-item">Vehicle</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
