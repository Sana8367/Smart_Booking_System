import React, { useState, useEffect } from "react";
import API from "../api/axios";
import { useNavigate, useLocation, Link } from "react-router-dom";

export default function ResetPassword() {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  const otp = location.state?.otp;

  useEffect(() => {
    if (!email || !otp) {
      navigate("/forgot-password");
    }
  }, [email, otp, navigate]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);

    try {

      await API.post("/auth/reset-password", {
        email,
        otp,
        newPassword: password,
      });

      // DIRECT REDIRECT
      navigate("/login");

    } catch (err) {
      setError("Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">

      {/* LEFT SIDE */}
      <div className="login-left">
        <div className="login-overlay">
          <h1>Create New Password</h1>
          <p>
            Secure your account with a strong password.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">
        <div className="login-card">

          <h2>Reset Password</h2>
          <p>Create your new password</p>

          {error && (
            <div className="error-text">
              {error}
            </div>
          )}

          <form onSubmit={handleResetPassword}>

            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Updating..." : "Reset Password"}
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