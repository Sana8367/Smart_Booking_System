import React, { useState } from "react";
import API from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/auth/login", {
      role,
      email,
      password,
    });

    login({
      token: res.data.token,
      role: res.data.user.role,
      name: res.data.user.name,
      id: res.data.user.id,
    });

    navigate("/dashboard");

  } catch (error) {
    setErr(error.response?.data?.message || "Login failed");
  }
};

  return (
    <div className="login-container">

      {/* LEFT SIDE */}
      <div className="login-left">
        <div className="login-overlay">
          <h1>Smart Booking</h1>
          <p>
            Book rooms smarter, faster and easier with our
            intelligent booking management system.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">
        <div className="login-card">

          <h2>Welcome Back</h2>
          <p>Login to continue</p>
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
            
            <button type="submit" className="login-btn">
              Login
            </button>

          </form>

          <div className="login-links">
            <Link to="/forgot-password">
              Forgot Password?
            </Link>

            <Link to="/register">
              Register
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}