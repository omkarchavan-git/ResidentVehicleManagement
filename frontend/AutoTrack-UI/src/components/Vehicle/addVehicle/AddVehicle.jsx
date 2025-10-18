import React, { useState, useEffect } from "react";
import "./addVehicle.css";
import { FaCarSide, FaIdCard, FaPalette, FaTag } from "react-icons/fa";

const AddVehicle = ({ onClose, residentId }) => {
  const [formData, setFormData] = useState({
    regNum: "",
    vehName: "",
    color: "",
    vehicleType: "",
    vehActive: true,
    resident: { id: residentId || null },
  });

  useEffect(() => {
    document.body.classList.add("add-vehicle-modal-open");
    return () => document.body.classList.remove("add-vehicle-modal-open");
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "radio") {
      setFormData({ ...formData, vehActive: value === "true" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8085/vehicle/addVehicle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to add vehicle");
      alert("✅ Vehicle added successfully");
      onClose(); // call onClose instead of handleCancel
    } catch (err) {
      console.error("Error:", err);
      alert("❌ Failed to add vehicle");
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    onClose(); // call onClose
  };

  return (
    <div className="add-vehicle-overlay">
      <div className="add-vehicle-form animate-add-vehicle">
        <h2 className="add-vehicle-title">Add Vehicle</h2>
        <form className="add-vehicle-form-grid" onSubmit={handleSubmit}>
          <div className="add-vehicle-input-group">
            <FaIdCard className="add-vehicle-icon" />
            <input
              type="text"
              name="regNum"
              placeholder=" "
              value={formData.regNum}
              onChange={handleChange}
              required
            />
            <label className="add-vehicle-label">Registration Number</label>
          </div>

          <div className="add-vehicle-input-group">
            <FaCarSide className="add-vehicle-icon" />
            <input
              type="text"
              name="vehName"
              placeholder=" "
              value={formData.vehName}
              onChange={handleChange}
              required
            />
            <label className="add-vehicle-label">Vehicle Name</label>
          </div>

          <div className="add-vehicle-input-group">
            <FaPalette className="add-vehicle-icon" />
            <input
              type="text"
              name="color"
              placeholder=" "
              value={formData.color}
              onChange={handleChange}
              required
            />
            <label className="add-vehicle-label">Color</label>
          </div>

          <div className="add-vehicle-input-group">
            <FaTag className="add-vehicle-icon" />
            <select
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              required
            >
              <option value="">Select Vehicle Type</option>
              <option value="CAR">Car</option>
              <option value="BIKE">Bike</option>
              <option value="SCOOTER">Scooter</option>
            </select>
          </div>

          <div className="add-vehicle-radio-group-container">
            <label className="add-vehicle-radio-label">Is Vehicle Active?</label>
            <div className="add-vehicle-radio-options">
              <label>
                <input
                  type="radio"
                  name="vehActive"
                  value="true"
                  checked={formData.vehActive === true}
                  onChange={handleChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="vehActive"
                  value="false"
                  checked={formData.vehActive === false}
                  onChange={handleChange}
                />
                No
              </label>
            </div>
          </div>

          <div className="add-vehicle-form-actions">
            <button type="submit" className="add-vehicle-btn-submit">
              Submit
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;
