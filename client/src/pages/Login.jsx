import React, { useState } from "react";
import API from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";


export default function Login() {
  const [role, setRole] = useState("student"); // NEW
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
        role, // send role to backend
      });

      login({
        token: res.data.token,
        role: res.data.user.role,
        name: res.data.user.name,
        id: res.data.user.id,
      });

      // Redirect based on role
      if (res.data.user.role === "admin") {
        navigate("/admin/rooms");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {
      setErr(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-wrapper">

        {/* LEFT BRAND */}
        <div className="brand-section">
          <h1>Smart Booking</h1>
          <p>Book rooms smarter, faster and easier.</p>
        </div>

        {/* RIGHT FORM */}
        <div className="form-section">
          <div className="login-card">
            <h2>Welcome Back</h2>

            {/* ROLE SWITCH */}
            <div className="role-switch">
              <button
                className={role === "student" ? "active" : ""}
                onClick={() => setRole("student")}
                type="button"
              >
                Student
              </button>

              <button
                className={role === "admin" ? "active" : ""}
                onClick={() => setRole("admin")}
                type="button"
              >
                Admin
              </button>
            </div>

            {err && <p className="error">{err}</p>}

            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email Address"
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

              <button disabled={loading}>
                {loading ? "Signing In..." : `Login as ${role}`}
              </button>
            </form>

            <p className="extra-links">
              <Link to="/forgot-password">Forgot Password?</Link>
            </p>

            {role === "student" && (
              <p className="register-text">
                Don’t have an account? <Link to="/register">Register</Link>
              </p>
            )}
          </div>
        </div>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }

        .login-wrapper {
          display: flex;
          height: 100vh;
          background: linear-gradient(135deg, #1e3c72, #2a5298);
        }

        .brand-section {
          flex: 1;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px;
        }

        .brand-section h1 {
          font-size: 48px;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .form-section {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(12px);
        }

        .login-card {
          background: white;
          padding: 40px;
          width: 380px;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
          text-align: center;
        }

        .role-switch {
          display: flex;
          margin-bottom: 20px;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #ddd;
        }

        .role-switch button {
          flex: 1;
          padding: 10px;
          border: none;
          cursor: pointer;
          background: #f5f5f5;
          font-weight: 500;
        }

        .role-switch button.active {
          background: #2a5298;
          color: white;
        }

        form input {
          width: 100%;
          padding: 14px;
          margin-bottom: 15px;
          border-radius: 12px;
          border: 1px solid #ddd;
          outline: none;
        }

        form input:focus {
          border-color: #2a5298;
          box-shadow: 0 0 8px rgba(42,82,152,0.3);
        }

        button[type="submit"] {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #1e3c72, #2a5298);
          color: white;
          font-weight: 600;
          cursor: pointer;
        }

        .error {
          color: red;
          font-size: 14px;
          margin-bottom: 10px;
        }

        .extra-links,
        .register-text {
          margin-top: 15px;
          font-size: 14px;
        }

        .extra-links a,
        .register-text a {
          color: #2a5298;
          text-decoration: none;
        }

        @media (max-width: 900px) {
          .login-wrapper {
            flex-direction: column;
          }

          .brand-section {
            text-align: center;
            padding: 40px;
          }
        }
      `}</style>
    </>
  );
}
