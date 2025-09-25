import { useState, useEffect } from "react";
// import './Visitor.css';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Visitor() {
  const [visitors, setVisitors] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 7;

  const [toast, setToast] = useState("");
  const [editingVisitor, setEditingVisitor] = useState(null);
  const [showUpdate, setShowUpdate] = useState(false);

  // fetch all visitors
  useEffect(() => {
    fetchAllVisitors();
  }, []);

  const fetchAllVisitors = () => {
    fetch("http://localhost:8085/visitor/getAllVisitor")
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a, b) => b.id - a.id);
        setVisitors(sorted);
      })
      .catch(err => console.error("Error fetching visitors:", err));
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
      "ID", "Visitor Name", "Vehicle Name", "Vehicle Reg. No", "Purpose",
      "Phone", "Time In", "Time Out", "Duration", "Type"
    ];

    const rows = visitors.map(v => [
      v.id,
      v.visitorName,
      v.vehicleName,
      v.vehicalRegisterationNum,
      v.visitPurpose || "N/A",
      v.phoneNumber,
      v.timeIn || "N/A",
      v.timeOut || "N/A",
      v.visitDuration || "N/A",
      v.visitorType
    ]);

    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 30,
      styles: { fontSize: 9 }
    });

    doc.save("visitor_list.pdf");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Visitor List</h2>

      {/* Export to PDF */}
      <button
        onClick={exportToPDF}
        style={{
          padding: "6px 12px",
          marginBottom: "10px",
          background: "#e65100",
          color: "#fff",
          border: "none",
          cursor: "pointer"
        }}
      >
        Export to PDF
      </button>

      {/* Table */}
      <table border="1" cellPadding="8" style={{ width: "100%", marginTop: "15px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Visitor Name</th>
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
          {selectedVisitors.length > 0 ? (
            selectedVisitors.map(visitor => (
              <tr key={visitor.id}>
                <td>{visitor.id}</td>
                <td>{visitor.visitorName}</td>
                <td>{visitor.vehicleName}</td>
                <td>{visitor.vehicalRegisterationNum}</td>
                <td>{visitor.visitPurpose || "N/A"}</td>
                <td>{visitor.phoneNumber}</td>
                <td>{visitor.timeIn || "N/A"}</td>
                <td>{visitor.timeOut || "N/A"}</td>
                <td>{visitor.visitDuration || "N/A"}</td>
                <td>{visitor.visitorType}</td>
                <td>
                  <button
                    className="update-btn"
                    onClick={() => { setEditingVisitor(visitor); setShowUpdate(true); }}
                  >
                    Update
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => {
                      fetch(`http://localhost:8085/visitor/deleteVisitorById/${visitor.id}`, { method: "DELETE" })
                        .then(res => {
                          if (res.ok) {
                            setVisitors(visitors.filter(v => v.id !== visitor.id));
                            setToast("Visitor deleted successfully!");
                          }
                        })
                        .catch(err => console.error(err));
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" style={{ textAlign: "center" }}>No visitors found</td>
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
              cursor: "pointer"
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Toast message */}
      {toast && (
        <div style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#333",
          color: "#fff",
          padding: "12px 20px",
          borderRadius: "6px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          zIndex: 1000
        }}>
          {toast}
        </div>
      )}
    </div>
  );
}

export default Visitor;
