import React, { useState, useEffect } from "react";
import "./UpdateVisitor.css";

function UpdateVisitor({ visitor, setToast, onClose, onUpdated }) {
  const [formData, setFormData] = useState({
    ...visitor,
    residentId: visitor.resident?.id || "", // initialize residentId
  });
  const [residents, setResidents] = useState([]); // for dropdown
  const [show, setShow] = useState(false);

  // Open modal
  useEffect(() => {
    setShow(true);

    // Fetch all residents for the dropdown
    fetch("http://localhost:8085/Resident/getAllResident")
      .then((res) => res.json())
      .then((data) => setResidents(data))
      .catch((err) => console.error("Error fetching residents:", err));
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Update visitor
  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `http://localhost:8085/visitor/updateVisitor/${visitor.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        const updated = await res.json();
        onUpdated(updated);

        setToast(
          `✅ Visitor ${updated.visitorName} (ID ${updated.id}) updated successfully!`
        );

        setShow(false);
        setTimeout(onClose, 300);
      } else {
        const errorText = await res.text();
        setToast(`❌ Failed to update visitor: ${errorText}`);
      }
    } catch (err) {
      setToast(`⚠️ Error updating visitor with ID ${visitor.id}`);
    }
  };

  // Cancel modal
  const handleCancel = () => {
    setShow(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className={`update-modal-overlay ${show ? "show" : ""}`}>
      <div className={`update-modal ${show ? "show" : ""}`}>
        <h2>Update Visitor</h2>

        <div className="form-grid">
          <div className="form-row">
            <input
              type="text"
              name="visitorName"
              value={formData.visitorName || ""}
              onChange={handleChange}
              placeholder="Visitor Name"
            />
          </div>

          <div className="form-row">
            <input
              type="text"
              name="vehicleName"
              value={formData.vehicleName || ""}
              onChange={handleChange}
              placeholder="Vehicle Name"
            />
          </div>

          <div className="form-row">
            <input
              type="text"
              name="vehicalRegisterationNum"
              value={formData.vehicalRegisterationNum || ""}
              onChange={handleChange}
              placeholder="Vehicle Registration No"
            />
          </div>

          <div className="form-row">
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber || ""}
              onChange={handleChange}
              placeholder="Phone Number"
            />
          </div>

          <div className="form-row">
            <input
              type="text"
              name="visitPurpose"
              value={formData.visitPurpose || ""}
              onChange={handleChange}
              placeholder="Purpose of Visit"
            />
          </div>

          <div className="form-row">
            <input
              type="datetime-local"
              name="timeIn"
              value={formData.timeIn || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <input
              type="datetime-local"
              name="timeOut"
              value={formData.timeOut || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <input
              type="text"
              name="visitDuration"
              value={formData.visitDuration || ""}
              onChange={handleChange}
              placeholder="Visit Duration"
            />
          </div>

          <div className="form-row visitorType">
            <select
              name="visitorType"
              value={formData.visitorType || ""}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              <option value="GUEST">Guest</option>
              <option value="DELIVERY">Delivery</option>
              <option value="WORKER">Worker</option>
            </select>
          </div>

          {/* ✅ Resident dropdown */}
          <div className="form-row">
            <input
              type="text"
              name="residentName"
              value={formData.residentName || ""}
              onChange={handleChange}
              placeholder="Resident to Meet"
            />
          </div>
        </div>

        {/* Buttons full width below grid */}
        <div className="modal-buttons form-full">
          <button className="submit-btn" onClick={handleUpdate}>
            Update
          </button>
          <button className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateVisitor;
