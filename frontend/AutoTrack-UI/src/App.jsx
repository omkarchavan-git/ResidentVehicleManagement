import { useState } from 'react'

import './App.css'
import Resident from './addResident/Resident'
import AddResident from './addResident/AddResident'
import Visitor from './addVisitor/Visitor'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Resident/>
        <Visitor/>
        {/* <AddResident /> */}
      </div>
    </>
  )
}

export default App
