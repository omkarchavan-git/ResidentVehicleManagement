import React, { useState, useEffect } from "react";
import "./UpdateVisitor.css";

function UpdateVisitor({ visitor, setToast, onClose, onUpdated }) {
  const [formData, setFormData] = useState({ ...visitor });
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true); // modal open animation
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

        setToast(`✅ Visitor ${updated.visitorName} (ID ${updated.id}) updated successfully!`);

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

  const handleCancel = () => {
    setShow(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className={`update-modal-overlay ${show ? "show" : ""}`}>
      <div className={`update-modal ${show ? "show" : ""}`}>
        <h2>Update Visitor</h2>

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

        <div className="form-row">
          <select
            name="visitorType"
            value={formData.visitorType || ""}
            onChange={handleChange}
          >
            <option value="">Select Type</option>
            <option value="Guest">Guest</option>
            <option value="Delivery">Delivery</option>
            <option value="Worker">Worker</option>
          </select>
        </div>

        {/* ✅ New field: Resident to meet */}
        <div className="form-row">
          <input
            type="text"
            name="residentName"
            value={formData.residentName || ""}
            onChange={handleChange}
            placeholder="Resident to Meet"
          />
        </div>

        <div className="modal-buttons">
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
