// HomeDashboard.jsx
import React, { useEffect, useState } from "react";
import "./HomeDashboard.css";

function HomeDashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8085/api/home/summary")
      .then((res) => res.json())
      .then((data) => setSummary(data))
      .catch((err) => console.error(err));
  }, []);

  if (!summary) return <p className="loading">Loading dashboard...</p>;

  return (
    <div className="dashboard-container">
      <h1>Community Dashboard</h1>

      {/* Cards */}
      <div className="cards">
        <div className="card total-residents">
          <h2>Total Residents</h2>
          <p>{summary.totalResidents}</p>
        </div>
        <div className="card total-vehicles">
          <h2>Total Vehicles</h2>
          <p>{summary.totalVehicles}</p>
        </div>
        <div className="card active-vehicles">
          <h2>Active Vehicles</h2>
          <p>{summary.activeVehicles}</p>
        </div>
        <div className="card visitors-today">
          <h2>Visitors Today</h2>
          <p>{summary.totalVisitorsToday}</p>
        </div>
        <div className="card visitors-week">
          <h2>Visitors This Week</h2>
          <p>{summary.totalVisitorsThisWeek}</p>
        </div>
      </div>

      {/* Recent Lists */}
      <div className="recent-lists">
        <div className="recent-section">
          <h3>Recent Residents</h3>
          <ul>
            {summary.recentResidents.map((r) => (
              <li key={r.id}>{r.firstname} {r.lastname}</li>
            ))}
          </ul>
        </div>

        <div className="recent-section">
          <h3>Recent Vehicles</h3>
          <ul>
            {summary.recentVehicles.map((v) => (
              <li key={v.id}>{v.regNum}</li>
            ))}
          </ul>
        </div>

        <div className="recent-section">
          <h3>Recent Visitors</h3>
          <ul>
            {summary.recentVisitors.map((v) => (
              <li key={v.id}>{v.visitorName}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HomeDashboard;
