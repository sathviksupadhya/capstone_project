import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigationbar from './components/Navigationbar'
import SignInForm from './components/SignIn'
import RegisterForm from './components/Register'
import LandingPage from './components/LandingPage'
import NavBar from './components/Home/NavBar'
import HomePage from './components/Home/HomePage'
import Events from './components/Home/Events'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/" element={<><Navigationbar /><LandingPage /></>} />
        <Route path="/home" element={<><NavBar /><HomePage /></>} />
        <Route path="/events" element={<><NavBar /><Events/></>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
