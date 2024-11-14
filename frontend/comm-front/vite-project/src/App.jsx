import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigationbar from './components/Navigationbar'
import SignInForm from './components/SignIn'
import RegisterForm from './components/Register'
import LandingPage from './components/LandingPage'
import EventForm from './components/EventForm'

function App() {
  return (
    <BrowserRouter>
      <Navigationbar />
      <Routes>
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/create-event" element={<EventForm />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
