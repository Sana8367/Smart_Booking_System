
 import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
 

import Login from "./pages/Login";
import Register from "./pages/Register";
import Rooms from "./pages/Rooms";
import MyBookings from "./pages/MyBookings";
import Dashboard from "./pages/Dashboard";


import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import AdminRooms from "./pages/AdminRooms";
import AdminBookings from "./pages/AdminBookings";


/* ✅ Layout component (INSIDE Router) */
function AppLayout() {
  const location = useLocation();

  const hideFooter =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* DASHBOARD */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* STUDENT ROUTES */}
          <Route
            path="/rooms"
            element={
              <ProtectedRoute>
                <Rooms />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />

          {/* ADMIN ROUTES */}
          <Route
            path="/admin/rooms"
            element={
              <AdminRoute>
                <AdminRooms />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/bookings"
            element={
              <AdminRoute>
                <AdminBookings />
              </AdminRoute>
            }
          />
        </Routes>
      </div>

      {!hideFooter && <Footer />}
    </>
  );
}

/* ✅ App ONLY wraps Router */
export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}