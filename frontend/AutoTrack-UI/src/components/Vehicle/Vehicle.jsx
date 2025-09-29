import React, { useEffect, useState } from "react";
import "./Vehicle.css";
import UpdateVehicle from "./UpdateVehicle";

function Vehicle() {
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [toastMsg, setToastMsg] = useState("");
    const [showToast, setShowToast] = useState(false);

    // ✅ Fetch vehicle data
    const fetchVehicles = () => {
        fetch("http://localhost:8085/vehicle/getallVehicles") // updated API
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
            fetch(`http://localhost:8085/vehicle/getallVehicles/${id}`, { method: "DELETE" })
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
        const { name, value, type, checked } = e.target;
        setSelectedVehicle((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // ✅ Save updated vehicle
    const handleSave = () => {
        fetch(`http://localhost:8085/vehicle/getallVehicles/${selectedVehicle.id}`, {
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
                            <td>{vehicle.residentName || "N/A"}</td> {/* ✅ using DTO field */}
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

            {showModal && (
                <UpdateVehicle
                    selectedVehicle={selectedVehicle}
                    handleChange={handleChange}
                    handleSave={handleSave}
                    handleCancel={() => setShowModal(false)}
                />
            )}


        </div>
    );
}

export default Vehicle;
