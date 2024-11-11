import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './auth/login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './resident/HomePage'
import Register from './auth/register'
import First from './resident/First'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1>sjdhfvkdhv</h1>
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<First/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
