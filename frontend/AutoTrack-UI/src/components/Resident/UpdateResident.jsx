import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaPhone, FaHome, FaParking } from "react-icons/fa";
import "./UpdateResident.css";

function UpdateResident({ resident, setToast, onClose, onUpdated }) {
  const [formData, setFormData] = useState({ ...resident });
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
  try {
    const updatedFields = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== resident[key]) {
        updatedFields[key] = formData[key];
      }
    });

    if (Object.keys(updatedFields).length === 0) {
      setToast("⚠️ No changes to update!");
      return;
    }

    const res = await fetch(
      `http://localhost:8085/Resident/updateResidentById/${resident.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields), // send only changed fields
      }
    );

    if (res.ok) {
      const updated = await res.json();
      onUpdated(updated);
      setToast(`✅ Resident ${updated.firstname} updated successfully!`);
      setShow(false);
      setTimeout(onClose, 300);
    } else {
      const errorText = await res.text();
      setToast(`❌ Failed to update resident: ${errorText}`);
    }
  } catch (err) {
    setToast(`⚠️ Error updating resident!`);
  }
};

  const handleCancel = () => {
    setShow(false);
    setTimeout(onClose, 200);
  };

  return (
    <div className={`update-modal-overlay ${show ? "show" : ""}`}>
      <div className={`updateresident-form ${show ? "show" : ""}`}>
        <h2>Update Resident</h2>

        <div className="input-group-updateresident">
          <FaUser className="icon" />
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label>First Name</label>
        </div>

        <div className="input-group-updateresident">
          <FaUser className="icon" />
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label>Last Name</label>
        </div>

        <div className="input-group-updateresident">
          <FaEnvelope className="icon" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label>Email</label>
        </div>

        <div className="input-group-updateresident">
          <FaPhone className="icon" />
          <input
            type="text"
            name="contactno"
            value={formData.contactno}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label>Contact Number</label>
        </div>

        <div className="input-group-updateresident">
          <FaHome className="icon" />
          <input
            type="text"
            name="flatno"
            value={formData.flatno}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label>Flat No.</label>
        </div>

        <div className="input-group-updateresident">
          <FaParking className="icon" />
          <input
            type="text"
            name="parkinglot"
            value={formData.parkinglot || ""}
            onChange={handleChange}
            placeholder=" "
          />
          <label>Parking Lot</label>
        </div>

        <div className="input-group-updateresident">
          <select
            name="residentType"
            value={formData.residentType}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="OWNER">Owner</option>
            <option value="TENANT">Tenant</option>
          </select>
          <label>Resident Type</label>
        </div>

        <div className="modal-buttons-updateresident">
          <button type="button" className="submit-btn" onClick={handleUpdate}>
            Update
          </button>
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateResident;
