import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import HomePage from "./resident/HomePage";
import ValidatePage from "./auth/Validate"; // Correct this if needed
//import Navbar from "./components/Navbar"; // Ensure import matches filename

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/navbar" element={<Navbar />} /> */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/validate" element={<ValidatePage />} /> {/* Correct component */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
