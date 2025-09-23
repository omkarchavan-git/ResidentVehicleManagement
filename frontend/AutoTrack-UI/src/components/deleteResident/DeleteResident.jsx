import React from "react";

const DeleteResident = ({ resident, onDeleted, setToast }) => {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete Resident: ${resident.firstname} (ID: ${resident.id})?`
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8085/Resident/deleteResidentById/${resident.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setToast(`✅ Resident deleted: ${resident.firstname} (ID: ${resident.id})`);
        onDeleted(resident.id); // Update table
      } else {
        const errorText = await response.text();
        setToast(`❌ Failed to delete: ${errorText}`);
      }
    } catch (error) {
      setToast(`⚠️ Error deleting Resident: ${resident.firstname}`);
      console.error(error);
    }

    // hide toast after 3s
    setTimeout(() => setToast(""), 4000);
  };

  return <button className="delete-btn" onClick={handleDelete}>Delete</button>;
};

export default DeleteResident;
