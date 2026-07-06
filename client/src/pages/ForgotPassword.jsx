import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {
      await API.post("/auth/forgot-password", { email });

      setMessage("OTP sent successfully");

      setTimeout(() => {
        navigate("/verify-otp", {
          state: { email },
        });
      }, 1000);

    } catch (err) {
      setError("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">

      {/* LEFT SIDE */}
      <div className="login-left">
        <div className="login-overlay">
          <h1>Forgot Password</h1>
          <p>
            Enter your registered email address to receive OTP.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">
        <div className="login-card">

          <h2>Reset Access</h2>
          <p>We'll send an OTP to your email</p>

          {message && (
            <div className="success-text">
              {message}
            </div>
          )}

          {error && (
            <div className="error-text">
              {error}
            </div>
          )}

          <form onSubmit={handleSendOtp}>

            <input
              type="email"
              placeholder="Enter registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>

          </form>

          <div className="login-links">
            <Link to="/login">
              Back to Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}