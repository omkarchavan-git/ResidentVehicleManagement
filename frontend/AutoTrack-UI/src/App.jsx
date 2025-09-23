import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Resident from './components/Resident/Resident';
import Visitor from './components/Visitor/Visitor';
import Navbar from './components/navbar/Navbar';
import HomeDashboard from './components/Dashboard/HomeDashboard';
import AddResident from './components/Resident/AddResident';

import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Router>
          <Navbar />
          <div className="pt-16"> {/* padding so content doesn’t hide behind navbar */}
            <Routes>
              <Route path='/' element={<Navigate to="/Dashboard" />} />
              <Route path='/Dashboard' element={<HomeDashboard />} />
              <Route path="/resident/addResident" element={<AddResident />} />
              <Route path="/resident/Resident" element={<Resident />} />
              <Route path="/visitor" element={<Visitor />} />
            </Routes>

          </div>
        </Router>
      </div>
    </>
  );
}

export default App;
