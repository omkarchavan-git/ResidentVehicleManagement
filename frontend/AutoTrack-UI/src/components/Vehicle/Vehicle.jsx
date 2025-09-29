import React, { useEffect, useState } from "react";
import "./Visitor.css";

function Vehicle() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);

  // ✅ Fetch vehicle data
  const fetchVehicles = () => {
    fetch("http://localhost:8085/vehicle/vehicles") // 🔹 replace with your backend API
      .then((res) => res.json())
      .then((data) => setVehicles(data))
      .catch((err) => console.error("Error fetching vehicles:", err));
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  // ✅ Toast helper
  const showToastMsg = (message) => {
    setToastMsg(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // ✅ Delete vehicle
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      fetch(`http://localhost:8085/vehicle/vehicles/${id}`, { method: "DELETE" })
        .then(() => {
          showToastMsg("Vehicle deleted successfully ✅");
          fetchVehicles(); // refresh table
        })
        .catch((err) => console.error("Error deleting vehicle:", err));
    }
  };

  // ✅ Open update modal
  const handleUpdate = (vehicle) => {
    setSelectedVehicle({ ...vehicle }); // clone object
    setShowModal(true);
  };

  // ✅ Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedVehicle((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Save updated vehicle
  const handleSave = () => {
    fetch(`http://localhost:8085/vehicle/vehicles/${selectedVehicle.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedVehicle),
    })
      .then((res) => res.json())
      .then(() => {
        setShowModal(false);
        showToastMsg("Vehicle updated successfully ✅");
        fetchVehicles(); // refresh table
      })
      .catch((err) => console.error("Error updating vehicle:", err));
  };

  return (
    <div className="vehicle-container">
      <h2 className="vehicle-title">🚗 Vehicle Management</h2>

      {/* ✅ Toast Notification */}
      {showToast && <div className="toast">{toastMsg}</div>}

      {/* ✅ Vehicle Table */}
      <table className="vehicle-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Reg. Number</th>
            <th>Name</th>
            <th>Color</th>
            <th>Type</th>
            <th>Resident</th>
            <th>Active</th>
            <th>Time In</th>
            <th>Time Out</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id} className="vehicle-row">
              <td>{vehicle.id}</td>
              <td>{vehicle.regNum}</td>
              <td>{vehicle.vehName}</td>
              <td>{vehicle.color}</td>
              <td>{vehicle.vehicleType}</td>
              <td>
                {vehicle.resident
                  ? `${vehicle.resident.firstname} ${vehicle.resident.lastname}`
                  : "N/A"}
              </td>
              <td>{vehicle.vehActive ? "Yes ✅" : "No ❌"}</td>
              <td>{vehicle.intime}</td>
              <td>{vehicle.outtime || "—"}</td>
              <td>
                <button
                  className="btn update-btn"
                  onClick={() => handleUpdate(vehicle)}
                >
                  Update
                </button>
                <button
                  className="btn delete-btn"
                  onClick={() => handleDelete(vehicle.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Modal Popup for Update */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Update Vehicle</h3>
            <form>
              <input
                type="text"
                name="regNum"
                value={selectedVehicle.regNum || ""}
                onChange={handleChange}
                placeholder="Registration Number"
              />
              <input
                type="text"
                name="vehName"
                value={selectedVehicle.vehName || ""}
                onChange={handleChange}
                placeholder="Vehicle Name"
              />
              <input
                type="text"
                name="color"
                value={selectedVehicle.color || ""}
                onChange={handleChange}
                placeholder="Color"
              />
              <input
                type="text"
                name="vehicleType"
                value={selectedVehicle.vehicleType || ""}
                onChange={handleChange}
                placeholder="Vehicle Type"
              />
              <input
                type="text"
                name="vehActive"
                value={selectedVehicle.vehActive ? "true" : "false"}
                onChange={handleChange}
                placeholder="Active Status"
              />
            </form>
            <div className="modal-buttons">
              <button className="btn update-btn" onClick={handleSave}>
                Save
              </button>
              <button
                className="btn delete-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Vehicle;
