import React, { useEffect, useState } from "react";
import "./HomeDashboard.css";

function HomeDashboard() {
  const [summary, setSummary] = useState(null);
  const [allVisitors, setAllVisitors] = useState([]);
  const [recentVisitors, setRecentVisitors] = useState([]);

  useEffect(() => {
    fetch("https://residentvehiclemanagement.onrender.com/api/home/summary")
      .then((res) => res.json())
      .then((data) => setSummary(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch("https://residentvehiclemanagement.onrender.com/visitor/getAllVisitor")
      .then((res) => res.json())
      .then((data) => {
        setAllVisitors(data);

        // Sort latest visitors and get top 5
        const sorted = data.sort((a, b) => b.id - a.id);
        setRecentVisitors(sorted.slice(0, 5));
      })
      .catch((err) => console.error(err));
  }, []);

  if (!summary) return <p className="loading">Loading dashboard...</p>;

  // Calculate visitors today and this week
  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday as start

  const visitorsToday = allVisitors.filter((v) => {
    if (!v.timeIn) return false;
    const timeIn = new Date(v.timeIn);
    return timeIn >= startOfToday;
  }).length;

  const visitorsThisWeek = allVisitors.filter((v) => {
    if (!v.timeIn) return false;
    const timeIn = new Date(v.timeIn);
    return timeIn >= startOfWeek;
  }).length;

  return (
    <div className="dashboard-container">
      <h1>Community Dashboard <hr /></h1>

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
          <p>{visitorsToday}</p>
        </div>
        <div className="card visitors-week">
          <h2>Visitors This Week</h2>
          <p>{visitorsThisWeek}</p>
        </div>
      </div>

      {/* Recent Lists */}
      <div className="recent-lists">
        <div className="recent-section">
          <h3>Recent Residents</h3>
          <ul>
            {summary.recentResidents && summary.recentResidents.length > 0 ? (
              summary.recentResidents.map((r) => (
                <li key={r.id}>{r.firstname} {r.lastname}</li>
              ))
            ) : (
              <li>No recent residents</li>
            )}
          </ul>
        </div>

        <div className="recent-section">
          <h3>Recent Vehicles</h3>
          <ul>
            {summary.recentVehicles && summary.recentVehicles.length > 0 ? (
              summary.recentVehicles.map((v) => (
                <li key={v.id}>{v.regNum}</li>
              ))
            ) : (
              <li>No recent vehicles</li>
            )}
          </ul>
        </div>

        <div className="recent-lists">
          <div className="recent-section">
            <h3>Recent Visitors</h3>
            <ul>
              {recentVisitors.length > 0 ? (
                recentVisitors.map((v) => <li key={v.id}>{v.visitorName}</li>)
              ) : (
                <li>No recent visitors</li>
              )}
            </ul>
          </div>
        </div>
      </div>
      </div>
      );
}

      export default HomeDashboard;
