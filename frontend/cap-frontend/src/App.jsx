// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/navbar';
import Home from './Components/Home';
import Events from './pages/Events';
import Schedule from './pages/Schedule';
import About from './pages/About';
import Feedback from './pages/Feedback';
import Contact from './pages/Contact';
import SignIn from './pages/Signin'; // Import SignIn page
import SignUp from './pages/SignUp';   // Import SignUp page

const App = () => {
    return (
        <Router>
            <Navbar />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/feedback" element={<Feedback />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/signin" element={<SignIn />} /> {/* Add route for Sign In */}
                    <Route path="/signup" element={<SignUp />} /> {/* Add route for Sign Up */}
                </Routes>
            </main>
        </Router>
    );
};

export default App;