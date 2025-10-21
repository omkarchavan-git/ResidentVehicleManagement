import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import HomeDashboard from './components/Dashboard/HomeDashboard';
import Resident from './components/Resident/Resident';
import AddResident from './components/Resident/AddResident';
import Visitor from './components/Visitor/Visitor';
import Vehicle from './components/Vehicle/Vehicle';

import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-16">
        <Routes>
          {/* Default route */}
          <Route path="/" element={<Navigate to="/dashboard" />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<HomeDashboard />} />

          {/* Resident routes */}
          <Route path="/resident" element={<Resident />} />
          <Route path="/resident/add" element={<AddResident />} />

          {/* Visitor & Vehicle */}
          <Route path="/visitor" element={<Visitor />} />
          <Route path="/vehicle" element={<Vehicle />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
