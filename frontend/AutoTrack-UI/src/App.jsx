import { useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Resident from './addResident/Resident'
import Visitor from './addVisitor/Visitor'
import Navbar from './navbar/Navbar'


import './App.css'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Router>
          <Navbar />
          <div className="pt-16"> {/* padding so content doesn’t hide behind navbar */}
            <Routes>
              <Route path="/resident" element={<Resident />} />
              <Route path="/visitor" element={<Visitor />} />
              {/* <Route path="/vehicle" element={<Vehicle />} /> */}
            </Routes>
          </div>
        </Router>
      </div>
    </>
  )
}

export default App
