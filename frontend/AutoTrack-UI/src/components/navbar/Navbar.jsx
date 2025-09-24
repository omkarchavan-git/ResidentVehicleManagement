import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ residentList, exportToPDF }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/" className="nav-item">Vehicle Management</Link>
        </div>

        <div className="nav-links">
          <div className="dropdown">
            <Link to="/resident/Resident" className="nav-item">Resident</Link>
            <div className="dropdown-content">
              <Link to="/resident/AddResident">Add Resident</Link>
              <div style={{ marginBottom: "10px" }}>
                <button
                  onClick={exportToPDF}
                  style={{
                    padding: "6px 12px",
                    marginRight: "10px",
                    background: "#e65100",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  Export to PDF
                </button>
              </div>

              <Link to="/resident/payments">Payments</Link>
              <Link to="/resident/settings">Settings</Link>
            </div>
          </div>

          <Link to="/visitor" className="nav-item">Visitor</Link>
          <Link to="/vehicle" className="nav-item">Vehicle</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
