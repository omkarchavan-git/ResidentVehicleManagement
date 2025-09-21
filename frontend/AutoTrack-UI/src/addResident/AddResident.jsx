import React, { useState } from "react";
import "./addResident.css"; // optional, for styling

function AddResident() {
  // form state
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    parkinglot: "",
    email: "",
    contactno: "",
    flatno: "",
    residentType: ""
  });

  const [message, setMessage] = useState("");

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // prepare payload
    const payload = {
      ...formData,
      contactno: Number(formData.contactno),
      residentType: formData.residentType.toUpperCase(), // must match enum
      vehicles: [] // empty array if not handling vehicles yet
    };

    try {
      const response = await fetch(
        "http://localhost:8085/Resident/saveResidents",
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
          parkinglot: "",
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

  // handle cancel/reset
  const handleCancel = () => {
    setFormData({
      firstname: "",
      lastname: "",
      parkinglot: "",
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
      <form onSubmit={handleSubmit} className="resident-form">
        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <input
          type="text"
          name="parkinglot"
          value={formData.parkinglot}
          onChange={handleChange}
          placeholder="parkinglot"
          
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="contactno"
          value={formData.contactno}
          onChange={handleChange}
          placeholder="Contact Number"
          required
        />
        <input
          type="text"
          name="flatno"
          value={formData.flatno}
          onChange={handleChange}
          placeholder="Flat No."
          required
        />
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

export default AddResident;
