import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaHome } from "react-icons/fa";
import "./addResident.css";

const AddResident = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    parkinglot: "",
    email: "",
    contactno: "",
    flatno: "",
    residentType: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your submit logic here
    setMessage("✅ Resident saved successfully!");
    setFormData({
      firstname: "",
      lastname: "",
      parkinglot: "",
      email: "",
      contactno: "",
      flatno: "",
      residentType: ""
    });
  };

  return (
    <div className="modal-overlay-resident" onClick={onClose}>
      <div className="modal-content-resident" onClick={(e) => e.stopPropagation()}>
        <h2>Add Resident</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-icon">
            <FaUser className="icon" />
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
            <label className={formData.firstname ? "filled" : ""}>First Name</label>
          </div>

          <div className="input-icon">
            <FaUser className="icon" />
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
            <label className={formData.lastname ? "filled" : ""}>Last Name</label>
          </div>

          <div className="input-icon">
            <FaHome className="icon" />
            <input
              type="text"
              name="parkinglot"
              value={formData.parkinglot}
              onChange={handleChange}
            />
            <label className={formData.parkinglot ? "filled" : ""}>Parking Lot</label>
          </div>

          <div className="input-icon">
            <FaEnvelope className="icon" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label className={formData.email ? "filled" : ""}>Email</label>
          </div>

          <div className="input-icon">
            <FaPhone className="icon" />
            <input
              type="text"
              name="contactno"
              value={formData.contactno}
              onChange={handleChange}
              required
            />
            <label className={formData.contactno ? "filled" : ""}>Contact Number</label>
          </div>

          <div className="input-icon">
            <FaHome className="icon" />
            <input
              type="text"
              name="flatno"
              value={formData.flatno}
              onChange={handleChange}
              required
            />
            <label className={formData.flatno ? "filled" : ""}>Flat No.</label>
          </div>

          <div className="input-icon">
            <select
              name="residentType"
              value={formData.residentType}
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              <option value="OWNER">Owner</option>
              <option value="TENANT">Tenant</option>
            </select>
            <label className={formData.residentType ? "filled" : ""}>Resident Type</label>
          </div>

          <div className="form-buttons">
            <button type="submit">Submit</button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>

          {message && <p className="form-message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddResident;
