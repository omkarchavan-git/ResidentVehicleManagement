import React from "react";
import "./UpdateVehicle.css";

function UpdateVehicle({ selectedVehicle, handleChange, handleSave, handleCancel }) {
  if (!selectedVehicle) return null;

  // convert ISO -> local "YYYY-MM-DDTHH:mm" for datetime-local inputs
  const toLocalDateTimeValue = (isoOrNull) => {
    if (!isoOrNull) return "";
    const d = new Date(isoOrNull);
    // create a local ISO-like string without timezone suffix
    const tzOffset = d.getTimezoneOffset() * 60000;
    const local = new Date(d.getTime() - tzOffset);
    return local.toISOString().slice(0, 16);
  };

  return (
    <div className="modal-overlay">
      <div className="modal update-vehicle-modal">
        <h3 className="modal-title">Update Vehicle</h3>
        <form className="update-form" onSubmit={(e) => e.preventDefault()}>
          {/* Row 1 */}
          <div className="form-row">
            <div className="form-group">
              <label>Registration Number</label>
              <input
                type="text"
                name="regNum"
                value={selectedVehicle.regNum || ""}
                onChange={handleChange}
                placeholder="Enter Reg. Number"
              />
            </div>

            <div className="form-group">
              <label>Vehicle Name</label>
              <input
                type="text"
                name="vehName"
                value={selectedVehicle.vehName || ""}
                onChange={handleChange}
                placeholder="Enter Vehicle Name"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="form-row">
            <div className="form-group">
              <label>Color</label>
              <input
                type="text"
                name="color"
                value={selectedVehicle.color || ""}
                onChange={handleChange}
                placeholder="Enter Color"
              />
            </div>

            <div className="form-group">
              <label>Vehicle Type</label>
              <input
                type="text"
                name="vehicleType"
                value={selectedVehicle.vehicleType || ""}
                onChange={handleChange}
                placeholder="Enter Vehicle Type"
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="form-row">
            <div className="form-group">
              <label>Time In</label>
              <input
                type="datetime-local"
                name="intime"
                value={toLocalDateTimeValue(selectedVehicle.intime)}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Time Out</label>
              <input
                type="datetime-local"
                name="outtime"
                value={toLocalDateTimeValue(selectedVehicle.outtime)}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Row 4 */}
          <div className="form-row">
            <div className="form-group">
              <label>Resident Name</label>
              <input
                type="text"
                name="residentName"
                value={selectedVehicle.residentName || ""}
                onChange={handleChange}
                placeholder="Enter Resident Name"
              />
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="vehActive"
                  checked={!!selectedVehicle.vehActive}
                  onChange={handleChange}
                />
                Active
              </label>
            </div>
          </div>
        </form>

        <div className="modal-buttons">
          {/* pass current modal values directly to handleSave to avoid any state race */}
          <button
            type="button"
            className="btn update-btn"
            onClick={() => handleSave(selectedVehicle)}
          >
            Save
          </button>
          <button type="button" className="btn cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateVehicle;
