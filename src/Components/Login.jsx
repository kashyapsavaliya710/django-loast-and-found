import React, { useState } from "react";
import users from "../API/Student.json"; // Import users data
import { useNavigate } from "react-router-dom";
import './login.css'
const Login = () => {
  const [enrollment, setEnrollment] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(
      (user) => user.ernumber === enrollment && user.pass === password
    );

    if (user) {
      setErrorMessage("");
      navigate("/home"); 
    } else {
      setErrorMessage("** User not found. Please check your credentials.");
    }
  };

  return (
    <>
    <div className="main-login-container">
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            {/* <label htmlFor="enrollment">Enrollment Number</label> */}
            <input
              type="text"
              id="enrollment"
              placeholder="Enter Enrollment Number"
              value={enrollment}
              onChange={(e) => setEnrollment(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            {/* <label htmlFor="password">Password</label> */}
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
    </div>
    </>
  );
};

export default Login;
