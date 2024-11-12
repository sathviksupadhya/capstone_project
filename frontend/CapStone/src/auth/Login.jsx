import { useNavigate } from "react-router-dom";
import "../authCSS/login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send credentials to the backend for authentication
      const response = await axios.post("http://localhost:9997/auth/validate/user", {
        userName: username,
        password: password,
      });

      // Store the JWT token in localStorage if authentication is successful
      const token = response.data;  // The token is returned as a plain string
      localStorage.setItem("jwtToken", token);  // Store the token

      navigate('/home');

      // Redirect or update UI based on authentication success
    } catch (err) {
      setError("Invalid credentials, please try again.");
    }
  };

  return (
    <>
      <div>
        <div>
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <h3>Login Here</h3>

          <label htmlFor="username">Username</label>
          <input type="text" placeholder="Email or Phone" id="username" value={username}
            onChange={(e) => setUsername(e.target.value)}/>

          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Password" id="password"  value={password}
            onChange={(e) => setPassword(e.target.value)}/>

          <button type="submit">Log In</button>

          <div className="social">
          </div>
        </form>
      </div>
    </>
  );
}
