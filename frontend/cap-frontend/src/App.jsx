// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Components/Home';
import Events from './pages/EventsPage';
import Schedule from './pages/Schedule';
import About from './pages/About';
import Feedback from './pages/Feedback';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn'; // Import SignIn page
import SignUp from './pages/SignUp';   // Import SignUp page

const App = () => {
    return (
        <Router>
            <Navbar />
            <main style={{ paddingTop: '50px' }}>
                
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

                {/* Create sections for smooth scrolling */}
                {/* <section id="home" style={{ height: '100vh', backgroundColor: '#f8f9fa' }}>
                    <h2>Home Section</h2>
                </section>
                <section id="events" style={{ height: '100vh', backgroundColor: '#e9ecef' }}>
                    <h2>Events Section</h2>
                </section>
                <section id="schedule" style={{ height: '100vh', backgroundColor: '#dee2e6' }}>
                    <h2>Schedule Section</h2>
                </section>
                <section id="about" style={{ height: '100vh', backgroundColor: '#ced4da' }}>
                    <h2>About Section</h2>
                </section>
                <section id="feedback" style={{ height: '100vh', backgroundColor: '#adb5bd' }}>
                    <h2>Feedback Section</h2>
                </section>
                <section id="contact" style={{ height: '100vh', backgroundColor: '#6c757d' }}>
                    <h2>Contact Section</h2>
                </section> */}
            </main>
        </Router>
    );
};

export default App;