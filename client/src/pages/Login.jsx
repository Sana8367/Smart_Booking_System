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

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const { data } = await API.post("/auth/login", { email, password });
      login(data.token);
      if (data.user.role === "admin") navigate("/admin/rooms");
      else navigate("/rooms");
    } catch (e) {
      setErr(e.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
       <form
  onSubmit={handleLogin}
  style={{
    width: "300px",
    margin: "100px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
  }}
>
  <h2 style={{ textAlign: "center" }}>Login</h2>

  <input
    placeholder="Email"
    style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
    onChange={(e) => setEmail(e.target.value)}
  />

  <input
    type="password"
    placeholder="Password"
    style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
    onChange={(e) => setPassword(e.target.value)}
  />

  <button style={{ width: "100%", padding: "8px" }}>
    Login
  </button>
</form>

    </div>
  );
}
