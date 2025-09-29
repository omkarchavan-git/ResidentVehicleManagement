import React from "react";
import "./UpdateVehicle.css";

function UpdateVehicle({ selectedVehicle, handleChange, handleSave, handleCancel }) {
  if (!selectedVehicle) return null;

  return (
    <div className="modal-overlay">
      <div className="modal update-vehicle-modal">
        <h3 className="modal-title">Update Vehicle</h3>
        <form className="update-form">
          <div className="form-group">
            <label>Registration Number</label>
            <input
              type="text"
              name="regNum"
              value={selectedVehicle.regNum || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Vehicle Name</label>
            <input
              type="text"
              name="vehName"
              value={selectedVehicle.vehName || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Color</label>
            <input
              type="text"
              name="color"
              value={selectedVehicle.color || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Vehicle Type</label>
            <input
              type="text"
              name="vehicleType"
              value={selectedVehicle.vehicleType || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="vehActive"
                checked={selectedVehicle.vehActive || false}
                onChange={handleChange}
              />
              Active
            </label>
          </div>
        </form>

        <div className="modal-buttons">
          <button className="btn update-btn" onClick={handleSave}>
            Save
          </button>
          <button className="btn delete-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateVehicle;
