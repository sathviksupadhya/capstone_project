import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './auth/login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './resident/HomePage'
import Register from './auth/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
