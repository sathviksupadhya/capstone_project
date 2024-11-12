import { useState } from "react";
import { useNavigate } from "react-router";

export default function Register(){
    const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const[role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Send credentials to the backend for registration
      const response = await axios.post("http://localhost:9997/auth/register", {
        userName: username,
        password: password,
        role: role,
      });

      navigate('/login');
      
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error("Error during registration:", err);
    }
  };
    return (
        <>
        <div>
        <div>
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
        <form className="login-form" onSubmit={handleRegister}>
          <h3>Register Here</h3>

          <label htmlFor="username">Username</label>
          <input type="text" placeholder="Email or Phone" id="username" value={username}
            onChange={(e) => setUsername(e.target.value)}/>

          <label htmlFor="role">Role</label>
          <input type="text" placeholder="Admin or Resident" id="role" value={role}
            onChange={(e) => setRole(e.target.value)}/>

          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Password" id="password"  value={password}
            onChange={(e) => setPassword(e.target.value)}/>
{error && <p style={{ color: "red" }}>{error}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
          <button type="button">Create account</button>
          <div className="social">
          </div>
        </form>
      </div>
        </>

    )
}