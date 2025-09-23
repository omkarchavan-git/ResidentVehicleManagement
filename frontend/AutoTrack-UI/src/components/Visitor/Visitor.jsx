import React, { useState } from "react";
import "./addVisitor.css";

function Visitor() {
    const [formData, setFormData] = useState({
        visitorName: "",
        vehicleName: "",
        vehicalRegisterationNum: "",
        visitPurpose: "",
        phoneNumber: "",
        visitorType: "",
        residentId: "",
        timeIn: "",
        timeOut: "",
    });

    const [useCurrentTime, setUseCurrentTime] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        const checked = e.target.checked;
        setUseCurrentTime(checked);

        if (checked) {
            // set current time in ISO format
            const now = new Date().toISOString().slice(0, 16); // yyyy-MM-ddTHH:mm
            setFormData({ ...formData, timeIn: now });
        } else {
            // clear so user can select manually
            setFormData({ ...formData, timeIn: "" });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            visitorType: formData.visitorType,        // "GUEST" or "DELIVERY"
            resident: { id: formData.residentId },    // must match your Resident entity
            timeIn: formData.timeIn || null,          // DateTime string or null
            timeOut: formData.timeOut || null,        // DateTime string or null
            isActiveVisitor: formData.isActiveVisitor // true/false
        };

        try {
            const response = await fetch("http://localhost:8080/visitor/addVisitor", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setMessage("✅ Visitor saved successfully!");
                setFormData({
                    visitorName: "",
                    vehicleName: "",
                    vehicalRegisterationNum: "",
                    visitPurpose: "",
                    phoneNumber: "",
                    visitorType: "",
                    residentId: "",
                    timeIn: "",
                    timeOut: "",
                });
                setUseCurrentTime(false);
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
            visitorName: "",
            vehicleName: "",
            vehicalRegisterationNum: "",
            visitPurpose: "",
            phoneNumber: "",
            visitorType: "",
            residentId: "",
            timeIn: "",
            timeOut: "",
        });
        setUseCurrentTime(false);
        setMessage("");
    };

    return (
        <div className="visitor-container">
            <h2>Add Visitor</h2>
            <form className="visitor-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="visitorName"
                    placeholder="Visitor Name"
                    value={formData.visitorName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="vehicleName"
                    placeholder="Vehicle Name"
                    value={formData.vehicleName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="vehicalRegisterationNum"
                    placeholder="Vehicle Registration Number"
                    value={formData.vehicalRegisterationNum}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="visitPurpose"
                    placeholder="Visit Purpose"
                    value={formData.visitPurpose}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                />
                <select
                    name="visitorType"
                    value={formData.visitorType}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Visitor Type</option>
                    <option value="GUEST">Guest</option>
                    <option value="DELIVERY">Delivery</option>
                </select>


                <input
                    type="number"
                    name="residentId"
                    placeholder="Resident ID"
                    value={formData.residentId}
                    onChange={handleChange}
                    required
                />

                {/* Time In with checkbox */}
                <label>
                    <input
                        type="checkbox"
                        checked={useCurrentTime}
                        onChange={handleCheckboxChange}
                    />
                    Use Current Time for Time In
                </label>

                <input
                    type="datetime-local"
                    name="timeIn"
                    value={formData.timeIn}
                    onChange={handleChange}
                    disabled={useCurrentTime}
                    required
                />

                {/* Time Out */}
                <input
                    type="datetime-local"
                    name="timeOut"
                    value={formData.timeOut}
                    onChange={handleChange}
                />

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

export default Visitor;
