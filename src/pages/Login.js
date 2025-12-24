import React, { useState } from "react";
import { loginUser } from "../services/api";
import "./Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await loginUser({ email, password });

    localStorage.setItem("token", data.token);
    localStorage.setItem("userName", data.user.name);

    window.location.href = "/dashboard";
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome Back</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" style={{ width: "100%" }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
