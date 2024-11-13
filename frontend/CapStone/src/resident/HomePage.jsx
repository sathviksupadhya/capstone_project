import { useEffect, useState } from "react";
import Alert from "./alert";
import "../CSS/home.css";
import Register from "../auth/Register";
import Login from "../auth/login";
import axios from "axios";

const HomePage = () => {
    const [userId, setUserId] = useState(null);
    const [alerts, setAlerts] = useState([]);
    const [isCardOpen, setIsCardOpen] = useState(false);

  const handleOpenCard = () => setIsCardOpen(true);
  const handleCloseCard = () => setIsCardOpen(false);
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (token) {
      try {
        // Decode the token to get user ID
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId; // Assuming userId is in the token
        setUserId(userId);

        // Fetch alerts using the user ID
        if (userId) {
          fetchUserAlerts(userId);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const fetchUserAlerts = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:9997/api/alert/user/${userId}`);
      setAlerts(response.data); // Set the fetched alerts in state
    } catch (error) {
      console.error("Error fetching user alerts:", error);
    }
  };

  function callalerts() {
    <h1>these are your alerts</h1>
  }
    return (
        <div className="homebody">
      <button onClick={handleOpenCard}>Login</button>

      {isCardOpen && <Login onClose={handleCloseCard} />}

      {alerts.length > 0 ? ({callalerts}) : <h2>add alerts</h2>}
    </div>
    )
}

export default HomePage;