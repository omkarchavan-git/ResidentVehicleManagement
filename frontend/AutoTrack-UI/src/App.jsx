import { useState } from 'react'

import './App.css'
import Resident from './addResident/Resident'
import AddResident from './addResident/AddResident'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Resident/>
        {/* <AddResident /> */}
      </div>
    </>
  )
}

export default App
