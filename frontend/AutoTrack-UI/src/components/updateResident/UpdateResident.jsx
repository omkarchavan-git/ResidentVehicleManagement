import React, { useEffect, useState } from "react";

/**
 * Props:
 * - resident: object to edit (must include id)
 * - onUpdated(updatedResident): callback to parent to update list
 * - onClose(): close modal
 * - setToast(message): parent toast setter (optional, recommended)
 */
const UpdateResident = ({ resident, onUpdated, onClose, setToast }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    parkinglot: "",
    email: "",
    contactno: "",
    flatno: "",
    residentType: ""
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (resident) {
      // copy resident (avoid mutating original)
      setFormData({
        firstname: resident.firstname ?? "",
        lastname: resident.lastname ?? "",
        parkinglot: resident.parkinglot ?? "",
        email: resident.email ?? "",
        contactno: resident.contactno ?? "",
        flatno: resident.flatno ?? "",
        residentType: resident.residentType ?? ""
      });
    }
  }, [resident]);

  const showToast = (msg) => {
    if (typeof setToast === "function") {
      setToast(msg);
      setTimeout(() => setToast(""), 3000);
    } else {
      // fallback: temporary console log (no blocking alert)
      console.log("TOAST:", msg);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // keep contactno digits-only
    if (name === "contactno") {
      const digitsOnly = value.replace(/\D/g, "");
      setFormData((p) => ({ ...p, [name]: digitsOnly }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resident || !resident.id) {
      showToast("⚠️ Cannot update: resident id missing");
      return;
    }

    setSaving(true);

    // Prepare payload (convert types if required)
    const payload = {
      ...formData,
      contactno: formData.contactno === "" ? null : Number(formData.contactno),
      residentType: formData.residentType ? formData.residentType.toUpperCase() : formData.residentType
    };

    try {
      const url = `http://localhost:8085/Resident/updateResidentById/${resident.id}`;
      console.log("Updating resident -> URL:", url, "Payload:", payload);

      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // If server responds with JSON error or message, read it
      const text = await response.text();
      let body;
      try { body = text ? JSON.parse(text) : null; } catch (err) { body = text; }

      if (!response.ok) {
        console.error("Update failed:", response.status, response.statusText, body);
        const errMsg = body && typeof body === "string" ? body : (body && body.message) ? body.message : `Status ${response.status}`;
        showToast(`❌ Failed to update: ${errMsg}`);
        setSaving(false);
        return;
      }

      // Success: parse JSON (if any)
      const updatedResident = body ?? payload; // if backend returns updated object, use it; otherwise use payload
      console.log("Update success:", updatedResident);

      showToast(`✅ Resident updated: ${updatedResident.id ?? resident.id} (${updatedResident.firstname ?? formData.firstname})`);
      if (typeof onUpdated === "function") onUpdated(updatedResident);

      setSaving(false);
      if (typeof onClose === "function") onClose();
    } catch (error) {
      console.error("Network or other error while updating resident:", error);
      showToast(`⚠️ Error updating resident with ID ${resident.id}: ${error.message ?? error}`);
      setSaving(false);
    }
  };

  return (
    <div className="update-modal-overlay" style={overlayStyle}>
      <div className="update-modal" style={modalStyle}>
        <h3 style={{ marginTop: 0 }}>Update Resident (ID: {resident?.id})</h3>
        <form onSubmit={handleSubmit}>
          <div style={rowStyle}>
            <input name="firstname" value={formData.firstname} onChange={handleChange} placeholder="First name" required />
            <input name="lastname" value={formData.lastname} onChange={handleChange} placeholder="Last name" required />
          </div>

          <div style={rowStyle}>
            <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            <input name="contactno" value={formData.contactno} onChange={handleChange} placeholder="Contact no" />
          </div>

          <div style={rowStyle}>
            <input name="flatno" value={formData.flatno} onChange={handleChange} placeholder="Flat no" />
            <input name="parkinglot" value={formData.parkinglot} onChange={handleChange} placeholder="Parking lot" />
          </div>

          <div style={{ marginBottom: 12 }}>
            <input name="residentType" value={formData.residentType} onChange={handleChange} placeholder="Resident Type (OWNER/TENANT)" />
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit" className="update-btn" disabled={saving}>
              {saving ? "Saving..." : "Update"}
            </button>
            <button type="button" className="cancel-btn" onClick={onClose} disabled={saving}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Minimal inline styles so it works out of box
const overlayStyle = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.35)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2000
};
const modalStyle = {
  background: "#fff",
  padding: 20,
  borderRadius: 8,
  minWidth: 360,
  boxShadow: "0 6px 18px rgba(0,0,0,0.2)"
};
const rowStyle = { display: "flex", gap: 8, marginBottom: 12 };

export default UpdateResident;
