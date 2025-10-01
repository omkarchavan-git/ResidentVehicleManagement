import React from "react";
import "./UpdateVehicle.css";

function UpdateVehicle({ selectedVehicle, handleChange, handleSave, handleCancel }) {
  if (!selectedVehicle) return null;

  const toLocalDateTimeValue = (isoOrNull) => {
    if (!isoOrNull) return "";
    const d = new Date(isoOrNull);
    const tzOffset = d.getTimezoneOffset() * 60000;
    const local = new Date(d.getTime() - tzOffset);
    return local.toISOString().slice(0, 16);
  };

  return (
    <div className="modal-overlay">
      <div className="modal update-vehicle-modal">
        <h3 className="modal-title">Update Vehicle</h3>
        <form className="form-grid" onSubmit={(e) => e.preventDefault()}>
          {/* Row 1 */}
          <div className="form-group-row">
            <label>Registration Number:</label>
            <input
              type="text"
              name="regNum"
              value={selectedVehicle.regNum || ""}
              onChange={handleChange}
              placeholder="Enter Reg. Number"
            />
          </div>

          <div className="form-group-row">
            <label>Vehicle Name:</label>
            <input
              type="text"
              name="vehName"
              value={selectedVehicle.vehName || ""}
              onChange={handleChange}
              placeholder="Enter Vehicle Name"
            />
          </div>

          {/* Row 2 */}
          <div className="form-group-row">
            <label>Color:</label>
            <input
              type="text"
              name="color"
              value={selectedVehicle.color || ""}
              onChange={handleChange}
              placeholder="Enter Color"
            />
          </div>

          <div className="form-group-row">
            <label>Vehicle Type:</label>
            <input
              type="text"
              name="vehicleType"
              value={selectedVehicle.vehicleType || ""}
              onChange={handleChange}
              placeholder="Enter Vehicle Type"
            />
          </div>

          {/* Row 3 */}
          <div className="form-group-row">
            <label>Time In:</label>
            <input
              type="datetime-local"
              name="intime"
              value={toLocalDateTimeValue(selectedVehicle.intime)}
              onChange={handleChange}
            />
          </div>

          <div className="form-group-row">
            <label>Time Out:</label>
            <input
              type="datetime-local"
              name="outtime"
              value={toLocalDateTimeValue(selectedVehicle.outtime)}
              onChange={handleChange}
            />
          </div>

          {/* Row 4 */}
          <div className="form-group-row">
            <label>Resident Name:</label>
            <input
              type="text"
              name="residentName"
              value={selectedVehicle.residentName || ""}
              onChange={handleChange}
              placeholder="Enter Resident Name"
            />
          </div>

          <div className="form-group-row">
            <label>Is Vehicle Active?</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="vehActive"
                  value="true"
                  checked={selectedVehicle.vehActive === true}
                  onChange={() => handleChange({ target: { name: "vehActive", value: true, type: "radio" } })}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="vehActive"
                  value="false"
                  checked={selectedVehicle.vehActive === false}
                  onChange={() => handleChange({ target: { name: "vehActive", value: false, type: "radio" } })}
                />
                No
              </label>
            </div>
          </div>
        </form>

        <div className="form-actions">
          <button className="btn update-btn" onClick={() => handleSave(selectedVehicle)}>
            Save
          </button>
          <button className="btn cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateVehicle;
