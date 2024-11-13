// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Ensure this path is correct

const Navbar = () => {
    const navigate = useNavigate();
    const handleSignIn = () => { 
        navigate('/signin', { state: { signInStatus: true } }); 
    };

    const handleSignUp = () => {
        navigate('/signup', { state: { signUpStatus: true } });
    }
    return (
        <nav className="navbar bg-blur">
            <h1 className="navbar-title">Community</h1>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/events">Events</Link></li>
                <li><Link to="/schedule">Schedule</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/feedback">Feedback</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
            <div className="auth-buttons">
<<<<<<< HEAD
            <button onClick={handleSignIn} className="btn">Sign In</button>
            <button onClick={handleSignUp} className="btn">Sign Up</button>
=======
                <Link to="/signin" className="btn">Sign In</Link>
                <Link to="/signup" className="btn">Create Account</Link>
>>>>>>> ce3e3c71682986bdf0af9aea48c55a70d5059b80
            </div>
        </nav>
    );
};

export default Navbar;
