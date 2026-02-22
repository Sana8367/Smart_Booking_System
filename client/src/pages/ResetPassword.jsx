import React, { useState, useEffect } from "react";
import API from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();



  const email = location.state?.email;
  const otp = location.state?.otp;

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      
      await API.post("/auth/reset-password", {
  email,
  otp,
  newPassword: password,
});

      alert("Password reset successful");
      navigate("/login");

    } catch (err) {
      setError("Failed to reset password");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Reset Password</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

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

          <button>Reset Password</button>
        </form>
      </div>
    </div>
  );
}