import React, { useState, useEffect } from "react";
import API from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
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
    setError("");

    try {
      await API.post("/auth/verify-otp", { email, otp });

    
      navigate("/reset-password", {
  state: { email, otp }
});

    } catch (err) {
      setError("Invalid or expired OTP");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Verify OTP</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleVerifyOtp}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button>Verify OTP</button>
        </form>
      </div>
    </div>
  );
}