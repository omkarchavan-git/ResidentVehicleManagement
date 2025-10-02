import React, { useState } from "react";
import "./addVisitor.css"; // your styles

const AddVisitor = ({ onClose, onVisitorAdded, setToast }) => {
    const [formData, setFormData] = useState({
        visitorName: "",
        vehicleName: "",
        vehicalRegisterationNum: "",
        visitPurpose: "",
        phoneNumber: "",
        timeIn: "",
        timeOut: "",
        visitorType: "",
        residentId: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8085/visitor/addVisitor", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    resident: { id: formData.residentId } 
                }),
            });

            if (response.ok) {
                const savedVisitor = await response.json();

                // update parent state
                if (onVisitorAdded) {
                    onVisitorAdded(savedVisitor);
                }

                // show toast
                if (setToast) {
                    setToast(`✅ Visitor added successfully: ${savedVisitor.visitorName}`);
                    setTimeout(() => setToast(""), 3000);
                }

                onClose();
            } else {
                const errorText = await response.text();
                if (setToast) {
                    setToast(`❌ Failed to add visitor: ${errorText}`);
                    setTimeout(() => setToast(""), 3000);
                }
            }
        } catch (error) {
            console.error("Error adding visitor:", error);
            if (setToast) {
                setToast("⚠️ Something went wrong!");
                setTimeout(() => setToast(""), 3000);
            }
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-form animate-popup">
                <h2>Add Visitor</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="visitorName" placeholder="Visitor Name" onChange={handleChange} required />
                    <input type="text" name="vehicleName" placeholder="Vehicle Name" onChange={handleChange} required />
                    <input type="text" name="vehicalRegisterationNum" placeholder="Vehicle Reg. Number" onChange={handleChange} required />
                    <input type="text" name="visitPurpose" placeholder="Visit Purpose" onChange={handleChange} />
                    <input type="number" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required />
                    <input type="datetime-local" name="timeIn" onChange={handleChange} />
                    <input type="datetime-local" name="timeOut" onChange={handleChange} />
                    <select name="visitorType" onChange={handleChange}>
                        <option value="">Select Visitor Type</option>
                        <option value="GUEST">Guest</option>
                        <option value="DELIVERY">Delivery</option>
                        <option value="SERVICE">Service</option>
                    </select>
                    <input type="number" name="residentId" placeholder="Resident ID" onChange={handleChange} required />

                    <div className="form-actions">
                        <button type="submit" className="btn-submit">Submit</button>
                        <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddVisitor;
