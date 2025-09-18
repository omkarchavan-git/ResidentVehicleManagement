import { useState } from 'react'
import './addResident/addResident.css'
import './App.css'
import Resident from './addResident/Resident'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Resident />
      </div>
    </>
  )
}

export default App
