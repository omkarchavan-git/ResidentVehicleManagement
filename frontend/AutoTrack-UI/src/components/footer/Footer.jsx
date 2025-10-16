import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <h3> Society Resident Management</h3>
        <p>
          Simplifying community living by managing residents, visitors, and
          vehicles efficiently — all in one smart system.
        </p>

        <div className="footer-socials">
          <a href="#" aria-label="Facebook">
            <FaFacebook />
          </a>
          <a href="#" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="#" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Society Resident Management | All Rights Reserved
      </div>
    </footer>
  );
}

export default Footer;
