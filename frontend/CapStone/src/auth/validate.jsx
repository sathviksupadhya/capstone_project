import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ValidatePage() {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [valid, setValid] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [userFetched, setUserFetched] = useState(false); // New state to track if user data was fetched

  useEffect(() => {
    fetch("http://localhost:9997/validate/user")
      .then((res) => res.json())
      .then((data) => setToken(data.token))
      .catch((err) => console.error("Error fetching user data:", err));
  }, []);

  useEffect(() => {
    if (token) {
      fetch("http://localhost:9997/validate/token", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setValid(data.valid))
        .catch((err) => console.error("Error validating token:", err));
    }
  }, [token]);

  // Only fetch user details once after validation is successful
  useEffect(() => {
    if (valid && !userFetched) {
      fetch(`http://localhost:9997/user/info`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setUserFetched(true); // Mark that user data has been fetched
        })
        .catch((err) => console.error("Error fetching user details:", err));
    }
  }, [valid, token, userFetched]);

  useEffect(() => {
    if (valid && user) {
      navigate("/home");
    } else if (!valid && token !== null) {
      navigate("/retry"); // Ensure this path exists for handling retry logic
    }
  }, [valid, user, navigate, token]);

  return (
    <div>
      {valid ? (
        <p>Login is successful, you will now be redirected to the home page!</p>
      ) : (
        <p>Token validation failed. Redirecting to retry page...</p>
      )}
    </div>
  );
}
