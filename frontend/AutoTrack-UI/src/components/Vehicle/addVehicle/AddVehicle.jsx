import React, { useState, useEffect } from "react";
import "./addVehicle.css";
import { FaCarSide, FaIdCard, FaPalette, FaTag } from "react-icons/fa";

const AddVehicle = ({ handleCancel }) => {
  const [formData, setFormData] = useState({
    regNum: "",
    vehName: "",
    color: "",
    vehicleType: "",
    vehActive: true,
  });

  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
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
      handleCancel();
    } catch (err) {
      console.error("Error:", err);
      alert("❌ Failed to add vehicle");
    }
  };

  return (
    <div className="vehicle-popup-overlay">
      <div className="vehicle-popup-form animate-popup">
        <h2>Add Vehicle</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group-vehicle">
            <FaIdCard className="icon" />
            <input
              type="text"
              name="regNum"
              placeholder=" "
              value={formData.regNum}
              onChange={handleChange}
              required
            />
            <label>Registration Number</label>
          </div>

          <div className="input-group-vehicle">
            <FaCarSide className="icon" />
            <input
              type="text"
              name="vehName"
              placeholder=" "
              value={formData.vehName}
              onChange={handleChange}
              required
            />
            <label>Vehicle Name</label>
          </div>

          <div className="input-group-vehicle">
            <FaPalette className="icon" />
            <input
              type="text"
              name="color"
              placeholder=" "
              value={formData.color}
              onChange={handleChange}
              required
            />
            <label>Color</label>
          </div>

          <div className="input-group-vehicle">
            <FaTag className="icon" />
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

          <div className="input-group-vehicle radio-group">
            <label className="radio-label">Is Vehicle Active?</label>
            <div className="radio-options">
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

          <div className="form-actions">
            <button type="submit" className="btn-submit-vehicle">Submit</button>
            <button type="button" onClick={handleCancel} className="btn-cancel-vehicle">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;
