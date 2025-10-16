import React from "react";
import "./UpdateVehicle.css";
import { FaCar, FaIdCard, FaPalette, FaUser, FaClock, FaCheckCircle } from "react-icons/fa";

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
    <div className="update-vehicle-overlay">
      <div className="update-vehicle-modal">
        <div className="update-vehicle-title">
          <h3>Update Vehicle</h3>
        </div>

        <form
          className="update-vehicle-form"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Row 1 */}
          <div className="update-vehicle-row">
            <label><FaIdCard className="update-vehicle-icon" /> Registration Number:</label>
            <input
              type="text"
              name="regNum"
              value={selectedVehicle.regNum || ""}
              onChange={handleChange}
              placeholder="Enter Reg. Number"
            />
          </div>

          <div className="update-vehicle-row">
            <label><FaCar className="update-vehicle-icon" /> Vehicle Name:</label>
            <input
              type="text"
              name="vehName"
              value={selectedVehicle.vehName || ""}
              onChange={handleChange}
              placeholder="Enter Vehicle Name"
            />
          </div>

          {/* Row 2 */}
          <div className="update-vehicle-row">
            <label><FaPalette className="update-vehicle-icon" /> Color:</label>
            <input
              type="text"
              name="color"
              value={selectedVehicle.color || ""}
              onChange={handleChange}
              placeholder="Enter Color"
            />
          </div>

          <div className="update-vehicle-row">
            <label><FaCar className="update-vehicle-icon" /> Vehicle Type:</label>
            <input
              type="text"
              name="vehicleType"
              value={selectedVehicle.vehicleType || ""}
              onChange={handleChange}
              placeholder="Enter Vehicle Type"
            />
          </div>

          {/* Row 3 */}
          <div className="update-vehicle-row">
            <label><FaClock className="update-vehicle-icon" /> Time In:</label>
            <input
              type="datetime-local"
              name="intime"
              value={toLocalDateTimeValue(selectedVehicle.intime)}
              onChange={handleChange}
            />
          </div>

          <div className="update-vehicle-row">
            <label><FaClock className="update-vehicle-icon" /> Time Out:</label>
            <input
              type="datetime-local"
              name="outtime"
              value={toLocalDateTimeValue(selectedVehicle.outtime)}
              onChange={handleChange}
            />
          </div>

          {/* Row 4 */}
          <div className="update-vehicle-row">
            <label><FaUser className="update-vehicle-icon" /> Resident Name:</label>
            <input
              type="text"
              name="residentName"
              value={selectedVehicle.residentName || ""}
              onChange={handleChange}
              placeholder="Enter Resident Name"
            />
          </div>

          <div className="update-vehicle-row">
            <label><FaCheckCircle className="update-vehicle-icon" /> Is Vehicle Active?</label>
            <div className="update-vehicle-radio-group">
              <label>
                <input
                  type="radio"
                  name="vehActive"
                  value="true"
                  checked={selectedVehicle.vehActive === true}
                  onChange={() =>
                    handleChange({
                      target: { name: "vehActive", value: true, type: "radio" },
                    })
                  }
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="vehActive"
                  value="false"
                  checked={selectedVehicle.vehActive === false}
                  onChange={() =>
                    handleChange({
                      target: { name: "vehActive", value: false, type: "radio" },
                    })
                  }
                />
                No
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="update-vehicle-actions">
            <button
              className="update-vehicle-btn save"
              onClick={() => handleSave(selectedVehicle)}
            >
              Save
            </button>
            <button
              className="update-vehicle-btn cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateVehicle;
