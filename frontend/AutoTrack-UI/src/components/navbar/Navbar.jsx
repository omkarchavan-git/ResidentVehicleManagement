import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ residentList, exportToPDF }) {
  return (
    <>
       
      {/* <div className="logo-wrapper">
        <img
          src="./images/logo.png"
          alt="Logo"
          className="logo-image"
        />
      </div> */}

      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo-text">
            <Link to="/" className="nav-item">Vehicle Management</Link>
          </div>

          <div className="nav-links">
            <div className="dropdown">
              <Link to="/resident/Resident" className="nav-item">Resident</Link>
              <div className="dropdown-content">
                <Link to="/resident/AddResident">Add Resident</Link>
                <Link to="/resident/payments">Payments</Link>
                <Link to="/resident/settings">Settings</Link>
              </div>
            </div>

            <Link to="/visitor" className="nav-item">Visitor</Link>
            <Link to="/vehicle" className="nav-item">Vehicle</Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
