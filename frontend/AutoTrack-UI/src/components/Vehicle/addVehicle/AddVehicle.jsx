import React, { useEffect, useState } from "react";
import "../addVehicle/AddVehicle.css";

function AddVehicle({ handleCancel }) {
  const [formData, setFormData] = useState({
    regNum: "",
    vehName: "",
    color: "",
    vehicleType: "",
    vehActive: true, // default Yes
  });

  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
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
      alert("Vehicle added successfully ✅");
      handleCancel();
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to add vehicle ❌");
    }
  };

  return (
    <div className="modal show">
      <div className="modal-content">
        <h3>Add New Vehicle</h3>
        <form onSubmit={handleSubmit} className="form-grid">
          <label>Registration Number:</label>
          <input type="text" name="regNum" value={formData.regNum} onChange={handleChange} required />

          <label>Vehicle Name:</label>
          <input type="text" name="vehName" value={formData.vehName} onChange={handleChange} required />

          <label>Color:</label>
          <input type="text" name="color" value={formData.color} onChange={handleChange} required />

          <label>Vehicle Type:</label>
          <select name="vehicleType" value={formData.vehicleType} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="CAR">Car</option>
            <option value="BIKE">Bike</option>
            <option value="SCOOTER">Scooter</option>
          </select>

          
          {/* Radio buttons for Active */}
          <label>Is Vehicle Active?</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="vehActive"
                value="true"
                checked={formData.vehActive === true}
                onChange={() => setFormData({ ...formData, vehActive: true })}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="vehActive"
                value="false"
                checked={formData.vehActive === false}
                onChange={() => setFormData({ ...formData, vehActive: false })}
              />
              No
            </label>
          </div>

          <div className="form-actions">
            <button type="submit">Add Vehicle</button>
            <button type="button" onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddVehicle;
