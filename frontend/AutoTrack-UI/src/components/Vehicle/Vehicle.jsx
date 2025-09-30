import React, { useEffect, useState } from "react";
import "./Vehicle.css";
import UpdateVehicle from "./UpdateVehicle";

function Vehicle() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Fetch vehicles
  const fetchVehicles = async () => {
    try {
      const res = await fetch("http://localhost:8085/vehicle/getallVehicles");
      if (!res.ok) throw new Error("Failed to fetch vehicles");
      const data = await res.json();
      setVehicles(data);
    } catch (err) {
      console.error("Error fetching vehicles:", err);
      showToastMsg("Failed to load vehicles ❌");
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  // Toast helper
  const showToastMsg = (message) => {
    setToastMsg(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Delete vehicle
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vehicle?")) return;
    try {
      const res = await fetch(`http://localhost:8085/vehicle/deletevehiclebyid/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      showToastMsg("Vehicle deleted successfully ✅");
      fetchVehicles();
    } catch (err) {
      console.error("Error deleting vehicle:", err);
      showToastMsg("Delete failed ❌");
    }
  };

  // Open modal for editing
  const handleUpdate = (vehicle) => {
    // clone to avoid mutating original list while editing
    setSelectedVehicle({ ...vehicle });
    setShowModal(true);
  };

  // Handle form input changes from UpdateVehicle
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue;

    if (type === "checkbox") {
      newValue = checked;
    } else if (type === "datetime-local") {
      // convert local datetime-local value (YYYY-MM-DDTHH:mm) -> ISO string
      newValue = value ? new Date(value).toISOString() : null;
    } else {
      newValue = value;
    }

    setSelectedVehicle((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  // Save updated vehicle.
  // Accepts optional vehicle override to avoid any state race between toggle and immediate save.
  const handleSave = async (vehicleOverride) => {
    const vehicleToSave = vehicleOverride || selectedVehicle;
    if (!vehicleToSave) return;

    // Build the payload: send booleans and ISO datetimes
    const bodyData = {
      regNum: vehicleToSave.regNum ?? null,
      vehName: vehicleToSave.vehName ?? null,
      color: vehicleToSave.color ?? null,
      vehicleType: vehicleToSave.vehicleType ?? null,
      // ensure ISO strings or null
      intime: vehicleToSave.intime ? new Date(vehicleToSave.intime).toISOString() : null,
      outtime: vehicleToSave.outtime ? new Date(vehicleToSave.outtime).toISOString() : null,
      // resident: prefer resident.id if present; keep residentName as-is
      resident: vehicleToSave.resident?.id ? { id: vehicleToSave.resident.id } : null,
      residentName: vehicleToSave.residentName ?? null,
      // ensure boolean
      vehActive: !!vehicleToSave.vehActive,
    };

    console.log("PATCH payload ->", bodyData);

    try {
      const res = await fetch(
        `http://localhost:8085/vehicle/updateVehicleById/${vehicleToSave.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(bodyData),
        }
      );

      // helpful verbose error capture
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Server responded ${res.status}: ${text}`);
      }

      const updated = await res.json().catch(() => null);
      console.log("PATCH response ->", updated);

      setShowModal(false);
      showToastMsg("Vehicle updated successfully ✅");
      fetchVehicles();
    } catch (err) {
      console.error("Error updating vehicle:", err);
      showToastMsg("Update failed ❌ (see console/network tab)");
    }
  };

  return (
    <div className="vehicle-container">
      <h2 className="vehicle-title">🚗 Vehicle Management</h2>

      {showToast && <div className="toast">{toastMsg}</div>}

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
                {vehicle.residentName
                  ? vehicle.residentName
                  : vehicle.resident
                  ? `${vehicle.resident.firstname} ${vehicle.resident.lastname}`
                  : "N/A"}
              </td>
              <td>{vehicle.vehActive ? "Yes ✅" : "No ❌"}</td>
              <td>{vehicle.intime ? new Date(vehicle.intime).toLocaleString() : "—"}</td>
              <td>{vehicle.outtime ? new Date(vehicle.outtime).toLocaleString() : "—"}</td>
              <td>
                <button className="btn update-btn" onClick={() => handleUpdate(vehicle)}>
                  Update
                </button>
                <button className="btn delete-btn" onClick={() => handleDelete(vehicle.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <UpdateVehicle
          selectedVehicle={selectedVehicle}
          handleChange={handleChange}
          // pass handleSave so UpdateVehicle can send the current modal values directly
          handleSave={handleSave}
          handleCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default Vehicle;
