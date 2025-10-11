import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ residentList, exportToPDF }) {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo-text">

            <Link to="/" className="nav-item">
              <div className="logo-wrapper">
                <img
                  src="./images/logo2.png"
                  alt="Logo"
                  className="logo-image"
                />
                <p className="appname">
                  Vehicle Management
                </p>
              </div>
            </Link>
          </div>

          <div className="nav-links">
            <Link to="/resident/Resident" className="nav-item"><p>Resident </p></Link>
            <Link to="/visitor" className="nav-item"><p>Visitor </p></Link>
            <Link to="/vehicle" className="nav-item"><p>Vehicle </p></Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
