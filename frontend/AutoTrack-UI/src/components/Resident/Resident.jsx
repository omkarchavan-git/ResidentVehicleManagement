import { useState, useEffect } from "react";
import DeleteResident from "../deleteResident/DeleteResident";
import "./Resident.css";
import UpdateResident from "../updateResident/UpdateResident";
import { useNavigate } from "react-router-dom";

import AddResident from "./AddResident";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Resident() {
  const [residents, setResidents] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 7;

  // search states
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const [toast, setToast] = useState(""); // to handle delte

  // handle update
  const [editingResident, setEditingResident] = useState(null);
  const [showUpdate, setShowUpdate] = useState(false);

  // fetch all residents initially
  useEffect(() => {
    fetchAllResidents();
  }, []);

  const fetchAllResidents = () => {
    fetch("http://localhost:8085/Resident/getAllResident")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => b.id - a.id);
        setResidents(sorted);
      })
      .catch((err) => console.error("Error fetching residents:", err));
  };

  // handle search
  const handleSearch = () => {
    if (!firstname && !lastname) {
      fetchAllResidents();
      return;
    }

    let url = `http://localhost:8085/Resident/getByName?`;
    if (firstname) url += `firstname=${firstname}&`;
    if (lastname) url += `lastname=${lastname}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("No data found");
        return res.json();
      })
      .then((data) => {
        const sorted = data.sort((a, b) => b.id - a.id);
        setResidents(sorted);
        setPage(1); // reset page
      })
      .catch((err) => {
        console.error("Error fetching search results:", err);
        setResidents([]);
      });
  };

  // add button
 const [showAddModal, setShowAddModal] = useState(false);

  // handle add button click
  const handleAddClick = () => {
    setShowAddModal(true);
  };
  // pagination logic
  const startIndex = (page - 1) * rowsPerPage;
  const selectedResidents = residents.slice(
    startIndex,
    startIndex + rowsPerPage
  );
  const totalPages = Math.ceil(residents.length / rowsPerPage);

  // delete function

  const removeResidentFromTable = (id) => {
    setResidents(residents.filter((r) => r.id !== id));
  };


  // export to pdf functionalityt
  const exportToPDF = () => {
    if (residents.length === 0) {
      alert("No resident data to export!");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Resident List", 14, 22);

    const columns = [
      "ID",
      "Contact No",
      "Email",
      "First Name",
      "Flat No",
      "Last Name",
      "Resident Type",
      "Parking Lot",
    ];

    const rows = residents.map((res) => [
      res.id,
      res.contactno,
      res.email,
      res.firstname,
      res.flatno,
      res.lastname,
      res.residentType,
      res.parkinglot || "N/A",
    ]);

    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 30,
      styles: { fontSize: 10 },
    });

    doc.save("resident_list.pdf");
  };

  return (
    <div style={{ padding: "20px" }} className="residentContainer">


      <div className="headingPanel">

       <h2 className="resident-title">🏘️ Resident Details</h2>

        {/* Search Bar */}
        <div style={{ marginBottom: "20px" }} className="searchBar">
          <input
            type="text"
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            style={{ marginRight: "10px", padding: "6px" }}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            style={{ marginRight: "10px", padding: "6px" }}
          />
          <button className="searchButton"
            onClick={handleSearch}

          >
            Search
          </button>
          <button
            onClick={() => {
              setFirstname("");
              setLastname("");
              fetchAllResidents();
            }}
          >
            Reset
          </button>

          {/* Export to pdf button */}

          <button
            onClick={exportToPDF}
            style={{
              padding: "6px 12px",
              margin: "10px",
              marginRight: "10px",
              background: "#e65100",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Export to PDF
          </button>
        </div>
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Contact No</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Flat No</th>
            <th>Resident Type</th>
            <th>Parking Lot</th>
            <th>Actions</th> {/* New column */}
          </tr>
        </thead>
        <tbody>
          {selectedResidents.length > 0 ? (
            selectedResidents.map((resident) => (
              <tr key={resident.id} >
                <td>{resident.id}</td>
                <td>{resident.contactno}</td>
                <td>{resident.email}</td>
                <td>{resident.firstname}</td>
                <td>{resident.lastname}</td>
                <td>{resident.flatno}</td>
                <td>{resident.residentType}</td>
                <td>{resident.parkinglot || "N/A"}</td>
                <td>
                  <button className="add-btn" onClick={handleAddClick}>
                    Add
                  </button>

                  <button
                    className="update-btn"
                    onClick={() => {
                      setEditingResident(resident);
                      setShowUpdate(true);
                    }}
                  >
                    Update
                  </button>

                  <DeleteResident
                    resident={resident}
                    onDeleted={(id) =>
                      setResidents(residents.filter((r) => r.id !== id))
                    }
                    setToast={setToast} // <-- Pass the parent toast setter here
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" style={{ textAlign: "center" }}>
                No residents found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ marginTop: "20px" }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            style={{
              margin: "0 5px",
              padding: "6px 12px",
              background: page === i + 1 ? "#e65100" : "#fff",
              color: page === i + 1 ? "#fff" : "#000",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>

       {/*  Add Resident Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <button
              className="modal-close"
              onClick={() => setShowAddModal(false)}
            >
              &times;
            </button>
            <AddResident
              onClose={() => setShowAddModal(false)}
              // optional: you can pass a callback to refresh table after adding
            />
          </div>
        </div>
      )}

      {/* for deltete to render the page as we delete */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "#333",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: "6px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            zIndex: 1000,
          }}
        >
          {toast}
        </div>
      )}

      {/*updation */}
      {showUpdate && editingResident && (
        <UpdateResident
          resident={editingResident}
          setToast={setToast} // ← pass setToast here
          onUpdated={(updated) => {
            setResidents((prev) =>
              prev.map((r) => (r.id === updated.id ? { ...r, ...updated } : r))
            );
          }}
          onClose={() => {
            setShowUpdate(false);
            setEditingResident(null);
          }}
        />
      )}
    </div>
  );
}

export default Resident;


