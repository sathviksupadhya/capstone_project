<<<<<<< HEAD
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import HomePage from "./resident/HomePage";
import ValidatePage from "./auth/Validate"; // Correct this if needed
//import Navbar from "./components/Navbar"; // Ensure import matches filename
=======
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './auth/login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './resident/HomePage'
import Register from './auth/register'
import First from './resident/First'
>>>>>>> 21932a14fd356243be3ffc4b04037ee7ca6c1c21

function App() {
  return (
<<<<<<< HEAD
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/navbar" element={<Navbar />} /> */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/validate" element={<ValidatePage />} /> {/* Correct component */}
      </Routes>
=======
    <>
    <h1>sjdhfvkdhv</h1>
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<First/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
>>>>>>> 21932a14fd356243be3ffc4b04037ee7ca6c1c21
    </BrowserRouter>
  );
}

export default App;
