

import React, { useState } from "react";
import API from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", res.data);

      // Save user + token in AuthContext
      login({
        token: res.data.token,
        role: res.data.user.role,
        name: res.data.user.name,
        id: res.data.user.id,
      });

      navigate("/dashboard");
    } catch (error) {
  console.log("LOGIN ERROR:", error.response?.data);
  setErr(error.response?.data?.message || "Login failed");
}

  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Smart Booking</h1>
        <p className="auth-subtitle">Login to continue booking rooms</p>

        {err && <p className="error">{err}</p>}

        <form onSubmit={handleLogin}>
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

          <button className="auth-btn">Login</button>
        </form>

        <p className="auth-footer">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
