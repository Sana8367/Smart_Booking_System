import React, { useState } from "react";
import API from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", {
        role,
        name,
        email,
        password,
      });

      navigate("/login");

    } catch (error) {
      setErr(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="login-container">

      <div className="login-left">
        <div className="login-overlay">
          <h1>Join Smart Booking</h1>
          <p>
            Create your account and start managing room bookings
            seamlessly and efficiently.
          </p>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">

          <h2>Create Account</h2>
          <p>Register to continue</p>

          <div className="role-switch-modern">

            <button
              type="button"
              className={role === "student" ? "active-role" : ""}
              onClick={() => setRole("student")}
            >
              Student
            </button>

            <button
              type="button"
              className={role === "admin" ? "active-role" : ""}
              onClick={() => setRole("admin")}
            >
              Admin
            </button>

          </div>

          {err && <div className="error-text">{err}</div>}

          <form onSubmit={handleRegister}>

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

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

            <button type="submit" className="login-btn">
              Register
            </button>

          </form>

          <p className="switch-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>

        </div>
      </div>
    </div>
  );
}