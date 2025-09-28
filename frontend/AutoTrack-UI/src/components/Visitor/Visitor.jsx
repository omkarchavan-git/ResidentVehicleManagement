import { useState, useEffect } from "react";
import "./Visitor.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// import delete + update + add components
import DeleteVisitor from "../deleteVisitor/DeleteVisitor";
import UpdateVisitor from "../updateVisitor/UpdateVisitor";
import AddVisitor from "./AddVisitor"; //

function Visitor() {
  const [visitors, setVisitors] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 7;
  const [toast, setToast] = useState("");

  // state for update modal
  const [editingVisitor, setEditingVisitor] = useState(null);
  const [showUpdate, setShowUpdate] = useState(false);

  // state for delete modal
  const [deletingVisitor, setDeletingVisitor] = useState(null);

  // state for add visitor modal
  const [showAdd, setShowAdd] = useState(false);


  // fetch all visitors
  useEffect(() => {
    fetchAllVisitors();
  }, []);

  const fetchAllVisitors = () => {
    fetch("http://localhost:8085/visitor/getAllVisitor")
      .then((res) => res.json())
      .then((data) => setVisitors(data.sort((a, b) => b.id - a.id)))
      .catch((err) => console.error("Error fetching visitors:", err));
  };

  const handleVisitorAdded = (newVisitor) => {
    setVisitors((prev) => [...prev, newVisitor]); // ✅ add visitor without reload
  };

  // pagination
  const startIndex = (page - 1) * rowsPerPage;
  const selectedVisitors = visitors.slice(startIndex, startIndex + rowsPerPage);
  const totalPages = Math.ceil(visitors.length / rowsPerPage);

  // export to PDF
  const exportToPDF = () => {
    if (visitors.length === 0) {
      alert("No visitor data to export!");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Visitor List", 14, 22);

    const columns = [
      "ID",
      "Visitor Name",
      "Resident Name",
      "Vehicle Name",
      "Vehicle Reg. No",
      "Purpose",
      "Phone",
      "Time In",
      "Time Out",
      "Duration",
      "Type",
    ];

    const rows = visitors.map((v) => [
      v.id,
      v.visitorName,
      v.residentName || "N/A",
      v.vehicleName,
      v.vehicalRegisterationNum,
      v.visitPurpose || "N/A",
      v.phoneNumber,
      v.timeIn || "N/A",
      v.timeOut || "N/A",
      v.visitDuration || "N/A",
      v.visitorType,
    ]);

    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 30,
      styles: { fontSize: 9 },
    });

    doc.save("visitor_list.pdf");
  };

  return (
    <div className="visitor-container">
      <h2 className="visitor-title">Visitor List</h2>

      <div className="visitor-actions">
        <button className="btn-export" onClick={exportToPDF}>
          Export to PDF
        </button>

        <button className="btn-addVisitor" onClick={() => setShowAdd(true)}>
          Add Visitor
        </button>
      </div>

      <table className="visitor-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Visitor Name</th>
            <th>Resident Name</th>
            <th>Vehicle Name</th>
            <th>Vehicle Reg. No</th>
            <th>Purpose</th>
            <th>Phone</th>
            <th>Time In</th>
            <th>Time Out</th>
            <th>Duration</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {selectedVisitors.map((visitor) => (
            <tr key={visitor.id}>
              <td>{visitor.id}</td>
              <td>{visitor.visitorName}</td>
              <td>{visitor.residentName || "N/A"}</td>
              <td>{visitor.vehicleName}</td>
              <td>{visitor.vehicalRegisterationNum}</td>
              <td>{visitor.visitPurpose || "N/A"}</td>
              <td>{visitor.phoneNumber}</td>
              <td>{visitor.timeIn || "N/A"}</td>
              <td>{visitor.timeOut || "N/A"}</td>
              <td>{visitor.visitDuration || "N/A"}</td>
              <td>{visitor.visitorType}</td>
              <td className="actions-col">
                <button
                  className="btn-update"
                  onClick={() => {
                    setEditingVisitor(visitor);
                    setShowUpdate(true);
                  }}
                >
                  Update
                </button>
                <button
                  className="btn-delete"
                  onClick={() => setDeletingVisitor(visitor)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`page-btn ${page === i + 1 ? "active" : ""}`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Toast */}
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

      {/* DeleteVisitor modal */}
      {deletingVisitor && (
        <DeleteVisitor
          visitor={deletingVisitor}
          setToast={setToast}
          onDeleted={(id) =>
            setVisitors((prev) => prev.filter((v) => v.id !== id))
          }
          onClose={() => setDeletingVisitor(null)}
        />
      )}

      {/* UpdateVisitor modal */}
      {showUpdate && editingVisitor && (
        <UpdateVisitor
          visitor={editingVisitor}
          setToast={setToast}
          onUpdated={(updated) => {
            setVisitors((prev) =>
              prev.map((v) => (v.id === updated.id ? { ...v, ...updated } : v))
            );
          }}
          onClose={() => {
            setShowUpdate(false);
            setEditingVisitor(null);
          }}
        />
      )}

      {/* Auto reload after adding data */}
      {showAdd && (
        <AddVisitor
          setToast={setToast}
          onVisitorAdded={(newVisitor) => {
            setVisitors((prev) => [newVisitor, ...prev]); // prepend new visitor
          }}
          onClose={() => setShowAdd(false)}
        />
      )}


      {/* AddVisitor modal */}
      {showAdd && (
        <AddVisitor
          setToast={setToast}
          onAdded={(newVisitor) => {
            setVisitors((prev) => [newVisitor, ...prev]); // prepend new visitor
          }}
          onClose={() => setShowAdd(false)}
        />
      )}
    </div>
  );
}

export default Visitor;
