import React, { useState, useEffect } from "react";
import "./DeleteVisitor.css";

function DeleteVisitor({ visitor, setToast, onClose, onDeleted }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true); // trigger modal animation
  }, []);

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:8085/Visitor/deleteVisitorById/${visitor.id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        onDeleted(visitor.id);
        setToast(`🗑️ Visitor ${visitor.name} (ID ${visitor.id}) deleted successfully!`);

        setShow(false);
        setTimeout(onClose, 300);
      } else {
        const errorText = await res.text();
        setToast(`❌ Failed to delete visitor: ${errorText}`);
      }
    } catch (err) {
      setToast(`⚠️ Error deleting visitor with ID ${visitor.id}`);
    }
  };

  const handleCancel = () => {
    setShow(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className={`delete-modal-overlay ${show ? "show" : ""}`}>
      <div className={`delete-modal ${show ? "show" : ""}`}>
        <h2>Confirm Deletion</h2>
        <p>
          Are you sure you want to <strong>delete visitor {visitor.name}</strong>?
        </p>

        <div className="modal-buttons">
          <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
          <button className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteVisitor;
