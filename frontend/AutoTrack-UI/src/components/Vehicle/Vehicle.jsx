import React, { useEffect, useState } from "react";
import "./Vehicle.css";
import UpdateVehicle from "./updateVehicle/UpdateVehicle";
import AddVehicle from "./addVehicle/AddVehicle";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Vehicle() {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Fetch vehicles
  const fetchVehicles = async () => {
    try {
      const res = await fetch("http://localhost:8085/vehicle/getallVehicles");
      if (!res.ok) throw new Error("Failed to fetch vehicles");
      const data = await res.json();
      setVehicles(data);
      setFilteredVehicles(data);
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
      newValue = value ? new Date(value).toISOString() : null;
    } else {
      newValue = value;
    }

    setSelectedVehicle((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  // Save updated vehicle
  const handleSave = async (vehicleOverride) => {
    const vehicleToSave = vehicleOverride || selectedVehicle;
    if (!vehicleToSave) return;

    const bodyData = {
      regNum: vehicleToSave.regNum ?? null,
      vehName: vehicleToSave.vehName ?? null,
      color: vehicleToSave.color ?? null,
      vehicleType: vehicleToSave.vehicleType ?? null,
      intime: vehicleToSave.intime ? new Date(vehicleToSave.intime).toISOString() : null,
      outtime: vehicleToSave.outtime ? new Date(vehicleToSave.outtime).toISOString() : null,
      resident: vehicleToSave.resident?.id ? { id: vehicleToSave.resident.id } : null,
      residentName: vehicleToSave.residentName ?? null,
      vehActive: !!vehicleToSave.vehActive,
    };

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

      if (!res.ok) throw new Error("Update failed");
      await res.json();
      setShowModal(false);
      showToastMsg("Vehicle updated successfully ✅");
      fetchVehicles();
    } catch (err) {
      console.error("Error updating vehicle:", err);
      showToastMsg("Update failed ❌ (see console/network tab)");
    }
  };

  // 🔹 Search filter
  const handleSearch = () => {
    const term = searchTerm.toLowerCase();
    const filtered = vehicles.filter(
      (v) =>
        v.regNum.toLowerCase().includes(term) ||
        v.vehName.toLowerCase().includes(term) ||
        v.color.toLowerCase().includes(term) ||
        (v.residentName && v.residentName.toLowerCase().includes(term))
    );
    setFilteredVehicles(filtered);
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilteredVehicles(vehicles);
  };


  // 🔹 Export to PDF
const exportToPDF = () => {
  try {
    const doc = new jsPDF();

  
    // 🔹 Add Title text
    doc.setFontSize(18);
    doc.text("Vehicle Report", 14, 20);

    // 🔹 Build table below title
    autoTable(doc, {
      startY: 30, // keep space for logo later
      head: [["ID", "Reg. Number", "Name", "Color", "Type", "Resident", "Active"]],
      body: filteredVehicles.map((v) => [
        v.id,
        v.regNum,
        v.vehName,
        v.color,
        v.vehicleType,
        v.residentName || (v.resident ? `${v.resident.firstname} ${v.resident.lastname}` : "N/A"),
        v.vehActive ? "Yes" : "No",
      ]),
    });

    // 🔹 Add timestamp footer
    const date = new Date();
    const formattedDate = date.toLocaleString();
    doc.setFontSize(10);
    doc.text(`Generated on: ${formattedDate}`, 14, doc.internal.pageSize.height - 10);

    // 🔹 Save file
    doc.save(`vehicleData-${date.toISOString().split("T")[0]}.pdf`);
  } catch (error) {
    console.error("Error exporting PDF:", error);
  }
};



  return (
    <div className="vehicle-container">
      <h2 className="heading-title">🚗 Vehicle Management</h2>

      {showToast && <div className="toast">{toastMsg}</div>}

      {/* 🔹 Toolbar */}
      <div className="toolbar">
        <input
          type="text"
          placeholder="Search vehicles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={exportToPDF}>Export to PDF</button>
        <button onClick={() => setShowAddModal(true)}>+ Add Vehicle</button>
      </div>

      {/* Table */}
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
          {filteredVehicles.map((vehicle) => (
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

      {/* Update Modal */}
      {showModal && (
        <UpdateVehicle
          selectedVehicle={selectedVehicle}
          handleChange={handleChange}
          handleSave={handleSave}
          handleCancel={() => setShowModal(false)}
        />
      )}

      {/* Add Modal */}
      {showAddModal && <AddVehicle handleCancel={() => setShowAddModal(false)} />}
    </div>
  );
}

export default Vehicle;
