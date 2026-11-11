import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);

    } catch (err) {
      alert("Login failed ❌");
    }
  };

  // ✅ RETURN MUST BE INSIDE FUNCTION
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login 🔐</h2>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
