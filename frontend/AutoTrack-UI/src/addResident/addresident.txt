import React, { useState } from "react";
import "./addResident.css";

function Resident() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contactno: "",
    flatno: "",
    residentType: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      contactno: Number(formData.contactno),
      residentType: formData.residentType.toUpperCase(),
      vehicles: []
    };

    try {
      const response = await fetch(
        "http://localhost:8080/Resident/saveResidents",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );

      if (response.ok) {
        setMessage("✅ Resident saved successfully!");
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          contactno: "",
          flatno: "",
          residentType: ""
        });
      } else {
        const errorText = await response.text();
        setMessage(`❌ Failed: ${errorText}`);
      }
    } catch (error) {
      setMessage("⚠️ Error connecting to server!");
    }
  };

  const handleCancel = () => {
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      contactno: "",
      flatno: "",
      residentType: ""
    });
    setMessage("");
  };

  return (
    <div className="resident-container">
      <h2>Add Resident</h2>
      <form className="resident-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={formData.firstname}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contactno"
          placeholder="Contact Number"
          value={formData.contactno}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="flatno"
          placeholder="Flat No."
          value={formData.flatno}
          onChange={handleChange}
          required
        />
        <select
          name="residentType"
          value={formData.residentType}
          onChange={handleChange}
          required
        >
          <option value="">Select Resident Type</option>
          <option value="OWNER">Owner</option>
          <option value="TENANT">Tenant</option>
        </select>

        <div className="form-buttons">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
      {message && <p className="form-message">{message}</p>}
    </div>
  );
}

export default Resident;
