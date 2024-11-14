import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigationbar from './components/Navigationbar'
import SignInForm from './components/SignIn'
import RegisterForm from './components/Register'
import LandingPage from './components/LandingPage'
import NavBar from './components/Home/NavBar'
import HomePage from './components/Home/HomePage'
import Events from './components/Home/Events'
import EventForm from './components/EventForm'
<<<<<<< HEAD

=======
import AdminNavBar from './components/Admin/AdminNavBar'
import AdminHome from './components/Admin/AdminHome'
import UserPage from './components/Admin/UserPage'
import AdminEvents from './components/Admin/AdminEvents'
import AdminAnalytics from './components/Admin/AdminAnalytics'
>>>>>>> e13180928f2ccdcf8fd0c23e6a375f26de377fbe
function App() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/register" element={<RegisterForm />} />
=======
        <Route path="/signin" element={<><Navigationbar /><SignInForm /></>} />
        <Route path="/register" element={<><Navigationbar /><RegisterForm /></>} />
>>>>>>> e13180928f2ccdcf8fd0c23e6a375f26de377fbe
        <Route path="/" element={<><Navigationbar /><LandingPage /></>} />
        <Route path="/home" element={<><NavBar /><HomePage /></>} />
        <Route path="/events" element={<><NavBar /><Events/></>} />
        <Route path="/create-event" element={<EventForm />} />
<<<<<<< HEAD
=======
        <Route path="/admin" element={<><AdminNavBar /><AdminHome /></>} />
        <Route path="/admin/users" element={<><AdminNavBar /><UserPage /></>} />
        <Route path="/admin/events" element={<><AdminNavBar /><AdminEvents /></>} />
        <Route path="/admin/analytics" element={<><AdminNavBar /><AdminAnalytics /></>} />
>>>>>>> e13180928f2ccdcf8fd0c23e6a375f26de377fbe
      </Routes>
    </BrowserRouter>
  )
}

export default App
