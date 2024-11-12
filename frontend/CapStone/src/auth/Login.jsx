import { useNavigate } from "react-router-dom";
import "../authCSS/login.css";

export default function Login() {
  const navigate = useNavigate();
  

  function auth(e) {
    e.preventDefault();

    // Get username and password values
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // You should validate the login credentials here
    // Assuming successful validation:

    // Store user data in sessionStorage (or localStorage)
    const userData = { username, password };
    sessionStorage.setItem("user", JSON.stringify(userData)); // Storing in sessionStorage

    // Navigate to the validation page with state
    navigate("/validate", { state: { user: userData } });
    
  }

  return (
    <>
      <div>
        <div>
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
        <form className="login-form" onSubmit={(e) => auth(e)}>
          <h3>Login Here</h3>

          <label htmlFor="username">Username</label>
          <input type="text" placeholder="Email or Phone" id="username" />

          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Password" id="password" />

          <button type="submit">Log In</button>

          <div className="social">
            {/* Social media login buttons */}
          </div>
        </form>
      </div>
    </>
  );
}
