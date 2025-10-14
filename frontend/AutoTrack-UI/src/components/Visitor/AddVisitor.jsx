import React, { useState } from "react";
import "./addVisitor.css"; // your styles
import {
    FaUser,
    FaCarSide,
    FaIdCard,
    FaClipboardList,
    FaPhone,
    FaClock,
    FaUsers,
    FaHome
} from "react-icons/fa";


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
        <div className="visitor-popup-overlay">
            <div className="visitor-popup-form animate-popup">
                <h2>Add Visitor</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group-visitor">
                        <FaUser className="icon" />
                        <input
                            type="text"
                            name="visitorName"
                            placeholder=" "
                            onChange={handleChange}
                            required
                        />
                        <label>Visitor Name</label>
                    </div>

                    <div className="input-group-visitor">
                        <FaCarSide className="icon" />
                        <input
                            type="text"
                            name="vehicleName"
                            placeholder=" "
                            onChange={handleChange}
                            required
                        />
                        <label>Vehicle Name</label>
                    </div>

                    <div className="input-group-visitor">
                        <FaIdCard className="icon" />
                        <input
                            type="text"
                            name="vehicalRegisterationNum"
                            placeholder=" "
                            onChange={handleChange}
                            required
                        />
                        <label>Vehicle Reg. Number</label>
                    </div>

                    <div className="input-group-visitor">
                        <FaClipboardList className="icon" />
                        <input
                            type="text"
                            name="visitPurpose"
                            placeholder=" "
                            onChange={handleChange}
                        />
                        <label>Visit Purpose</label>
                    </div>

                    <div className="input-group-visitor">
                        <FaPhone className="icon" />
                        <input
                            type="number"
                            name="phoneNumber"
                            placeholder=" "
                            onChange={handleChange}
                            required
                        />
                        <label>Phone Number</label>
                    </div>

                    <div className="input-group-visitor">
                        <FaClock className="icon" />
                        <input
                            type="datetime-local"
                            name="timeIn"
                            onChange={handleChange}
                        />
                        <label>Time In</label>
                    </div>

                    <div className="input-group-visitor">
                        <FaClock className="icon" />
                        <input
                            type="datetime-local"
                            name="timeOut"
                            onChange={handleChange}
                        />
                        <label>Time Out</label>
                    </div>

                    <div className="input-group-visitor">
                        <FaUsers className="icon" />
                        <select name="visitorType" onChange={handleChange}>
                            <option value="">Select Visitor Type</option>
                            <option value="GUEST">Guest</option>
                            <option value="DELIVERY">Delivery</option>
                            <option value="SERVICE">Service</option>
                        </select>
                        
                    </div>

                    <div className="input-group-visitor">
                        <FaHome className="icon" />
                        <input
                            type="number"
                            name="residentId"
                            placeholder=" "
                            onChange={handleChange}
                            required
                        />
                        <label>Resident ID</label>
                    </div>

                    <div className="form-actions">
                        <button type=" " className="btn-submit-visitor">Submit</button>
                        <button type=" " className="btn-cancel-visitor" onClick={onClose}>Cancel</button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddVisitor;
