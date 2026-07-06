import React, { useState, useEffect } from "react";
import API from "../api/axios";
import { useNavigate, useLocation, Link } from "react-router-dom";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await API.post("/auth/verify-otp", {
        email,
        otp,
      });

      navigate("/reset-password", {
        state: { email, otp },
      });

    } catch (err) {
      setError("Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  // RESEND OTP
  const handleResendOtp = async () => {
    try {
      await API.post("/auth/forgot-password", { email });

      setMessage("OTP resent successfully");
      setError("");

    } catch (err) {
      setError("Failed to resend OTP");
    }
  };

  return (
    <div className="login-container">

      {/* LEFT SIDE */}
      <div className="login-left">
        <div className="login-overlay">
          <h1>OTP Verification</h1>
          <p>
            Enter the OTP sent to your email address.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">
        <div className="login-card">

          <h2>Verify OTP</h2>
          <p>Check your email inbox</p>

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

          <form onSubmit={handleVerifyOtp}>

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

          </form>

          <div className="login-links">

            <button
              onClick={handleResendOtp}
              className="resend-btn"
            >
              Resend OTP
            </button>

            <Link to="/login">
              Back to Login
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
}