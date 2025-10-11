import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/images/logo2.png"


function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); //  to highlight active route

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLinkClick = () => setIsMenuOpen(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/*  Logo Section */}
          <Link to="/" className="logo-text" onClick={handleLinkClick}>
            <div className="logo-wrapper">

             <img src={logo} alt="Logo" className="logo-image" />

              <p className="appname"> Vehicle Management</p>
            </div>
          </Link>

          {/*  Hamburger Icon */}
          <div
            className={`hamburger ${isMenuOpen ? "active" : ""}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/*  Navigation Links */}
          <div className={`nav-links ${isMenuOpen ? "show" : ""}`}>
            <Link
              to="/resident/Resident"
              className={`nav-item ${location.pathname === "/resident/Resident" ? "active" : ""
                }`}
              onClick={handleLinkClick}
            >  <p className="navpage"> 
                Resident
              </p>
            </Link>
            <Link
              to="/visitor"
              className={`nav-item ${location.pathname === "/visitor" ? "active" : ""
                }`}
              onClick={handleLinkClick}
            > <p>
                Visitor
              </p>
            </Link>
            <Link
              to="/vehicle"
              className={`nav-item ${location.pathname === "/vehicle" ? "active" : ""
                }`}
              onClick={handleLinkClick}
            > <p>

                Vehicle
              </p>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
