import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigationbar from './components/Navigationbar'
import SignInForm from './components/SignIn'
import RegisterForm from './components/Register'
import LandingPage from './components/LandingPage'
<<<<<<< HEAD
import NavBar from './components/Home/NavBar'
import HomePage from './components/Home/HomePage'
import Events from './components/Home/Events'
=======
import EventForm from './components/EventForm'
>>>>>>> 3503584ef1211a62f322ef89547fce7e830c11a3

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/register" element={<RegisterForm />} />
<<<<<<< HEAD
        <Route path="/" element={<><Navigationbar /><LandingPage /></>} />
        <Route path="/home" element={<><NavBar /><HomePage /></>} />
        <Route path="/events" element={<><NavBar /><Events/></>} />
=======
        <Route path="/create-event" element={<EventForm />} />
        <Route path="/" element={<LandingPage />} />
>>>>>>> 3503584ef1211a62f322ef89547fce7e830c11a3
      </Routes>
    </BrowserRouter>
  )
}

export default App
