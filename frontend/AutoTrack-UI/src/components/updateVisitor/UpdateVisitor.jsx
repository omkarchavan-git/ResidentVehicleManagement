import React, { useState, useEffect } from "react";
import "./UpdateVisitor.css";

function UpdateVisitor({ visitor, setToast, onClose, onUpdated }) {
  const [formData, setFormData] = useState({ ...visitor });
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true); // trigger modal open animation
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `http://localhost:8085/Visitor/updateVisitorById/${visitor.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        const updated = await res.json();
        onUpdated(updated);

        setToast(
          `✅ Visitor ${updated.name} (ID ${updated.id}) updated successfully!`
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
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Visitor Name"
          />
        </div>

        <div className="form-row">
          <input
            type="text"
            name="contactno"
            value={formData.contactno}
            onChange={handleChange}
            placeholder="Contact Number"
          />
        </div>

        <div className="form-row">
          <input
            type="text"
            name="flatno"
            value={formData.flatno}
            onChange={handleChange}
            placeholder="Visiting Flat No."
          />
        </div>

        <div className="form-row">
          <input
            type="text"
            name="purpose"
            value={formData.purpose || ""}
            onChange={handleChange}
            placeholder="Purpose of Visit"
          />
        </div>

        <div className="form-row">
          <input
            type="datetime-local"
            name="checkin"
            value={formData.checkin || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <input
            type="datetime-local"
            name="checkout"
            value={formData.checkout || ""}
            onChange={handleChange}
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
