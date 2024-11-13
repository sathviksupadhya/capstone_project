


import React, { useEffect, useState } from 'react';
import Carousel from '../Components/Carousel';
import SignIn from '../pages/Signin';
import { useLocation } from 'react-router-dom';
import Alert from './alert';
import axios from 'axios';

const Home = () => {
    const location = useLocation();
    const [userId, setUserId] = useState(null);
    const [alerts, setAlerts] = useState([]);
    const [isLoginClicked, setIsloginClicked] = useState(false);
    const [isSignUpClicked, setIssignupClicked] = useState(false);

    // Function to close the login modal
    const handleCloselogin = () => setIsloginClicked(false);

    // Function to close the signup modal
    const handleClosesignup = () => setIssignupClicked(false);

    // Fetch alerts for the user
    const fetchAlerts = async () => {
        if (userId) {
            try {
                const response = await axios.get(`http://localhost:9994/api/alert/user/${userId}`);
                setAlerts(response.data); // Set the fetched alerts in state
            } catch (error) {
                console.error("Error fetching alerts:", error);
            }
        }
    };

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        setUserId(storedUserId); // Set the userId from sessionStorage
        console.log(userId)
        if (location.state?.signInStatus) {
            setIsloginClicked(true); // Show login modal
        } else if (location.state?.signUpStatus) {
            setIssignupClicked(true); // Show signup modal
        }
    }, [location]); // Trigger useEffect on location changes (navigation)

    useEffect(() => {
        console.log("check2")
        if (userId && userId !== "null" && userId !== "undefined" && userId !== "0" && userId !== "") {
            console.log("User ID:", userId);
            fetchAlerts(); // Fetch alerts when userId is set and valid
        }
    }, [userId]); // Trigger when userId changes

    return (
        <div>
            <Carousel />
            {isLoginClicked && <SignIn onClose={handleCloselogin} />}
            {isSignUpClicked && <SignUp onClose={handleClosesignup} />}
            {alerts.length > 0 && <Alert alerts={alerts} />} {/* Pass alerts data */}
        </div>
    );
};

export default Home;
