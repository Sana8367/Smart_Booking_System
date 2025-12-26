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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <form
        onSubmit={submit}
        className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">🔑 Login</h2>
        
        {err && (
          <div className="text-red-600 text-sm text-center bg-red-100 p-2 rounded">
            {err}
          </div>
        )}

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        
        <button
          className="w-full p-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Sign in
        </button>

        <div className="text-sm text-center mt-2 text-gray-600">
          No account?{" "}
          <Link className="text-indigo-500 font-medium hover:underline" to="/register">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}
