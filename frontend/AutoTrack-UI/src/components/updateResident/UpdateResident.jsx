import React, { useState, useEffect } from "react";
import "./UpdateResident.css";

function UpdateResident({ resident, setToast, onClose, onUpdated }) {
  const [formData, setFormData] = useState({ ...resident });
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
        `http://localhost:8085/Resident/updateResidentById/${resident.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        const updated = await res.json();
        onUpdated(updated);

        // Show toast message
        setToast(`✅ Resident ${updated.firstname} (ID ${updated.id}) updated successfully!`);

        setShow(false);
        setTimeout(onClose, 300); // wait for modal close animation
      } else {
        const errorText = await res.text();
        setToast(`❌ Failed to update resident: ${errorText}`);
      }
    } catch (err) {
      setToast(`⚠️ Error updating resident with ID ${resident.id}`);
    }
  };

  const handleCancel = () => {
    setShow(false);
    setTimeout(onClose, 300); // wait for animation
  };

  return (
    <div className={`update-modal-overlay ${show ? "show" : ""}`}>
      <div className={`update-modal ${show ? "show" : ""}`}>
        <h2>Update Resident</h2>

        <div className="form-row">
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="First Name"
          />
        </div>

        <div className="form-row">
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Last Name"
          />
        </div>

        <div className="form-row">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
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
            placeholder="Flat No."
          />
        </div>

        <div className="form-row">
          <input
            type="text"
            name="parkinglot"
            value={formData.parkinglot || ""}
            onChange={handleChange}
            placeholder="Parking Lot"
          />
        </div>

        <div className="form-row">
          <select
            name="residentType"
            value={formData.residentType}
            onChange={handleChange}
          >
            <option value="">Select Type</option>
            <option value="OWNER">Owner</option>
            <option value="TENANT">Tenant</option>
          </select>
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

export default UpdateResident;
