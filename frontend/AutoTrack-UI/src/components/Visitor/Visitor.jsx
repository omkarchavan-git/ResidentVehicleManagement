import { useState, useEffect } from "react";
import "./Visitor.css";
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
      .then(data => setVisitors(data.sort((a, b) => b.id - a.id)))
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
    <div className="visitor-container">
      <h2 className="visitor-title">Visitor List</h2>

      <div className="visitor-actions">
        <button className="btn-export" onClick={exportToPDF}>Export to PDF</button>
      </div>

      <table className="visitor-table">
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
                <td className="actions-col">
                  <button className="btn-update" onClick={() => { setEditingVisitor(visitor); setShowUpdate(true); }}>Update</button>
                  <button
                    className="btn-delete"
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
              <td colSpan="11" className="no-data">No visitors found</td>
            </tr>
          )}
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
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

export default Visitor;
