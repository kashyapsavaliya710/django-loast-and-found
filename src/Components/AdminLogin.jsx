// AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Check if the admin credentials are correct (for simplicity, we use hardcoded values)
    if (username === "admin" && password === "admin123") {
      // Store the login status (for simplicity, we use localStorage)
      localStorage.setItem("isAdminLoggedIn", "true");
      navigate("/admin"); // Redirect to admin page
    } else {
      setErrorMessage("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="admin-login">
      <h1>Admin Login</h1>
      <div>
        <label>Username: </label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
      </div>
      <div>
        <label>Password: </label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default AdminLogin;
