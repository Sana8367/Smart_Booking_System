import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Rooms from "./pages/Rooms";
import MyBookings from "./pages/MyBookings";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";

import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import AdminRooms from "./pages/AdminRooms";
import AdminBookings from "./pages/AdminBookings";

import About from "./pages/About";
 import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
/* ✅ Layout component (INSIDE Router) */
function AppLayout() {
  const location = useLocation();

  // ❌ Pages WITHOUT navbar
const hideHeaderPages = ["/",
  "/login",
  "/register",
  "/forgot-password",
  "/verify-otp",
  "/reset-password",];

const hideHeader = hideHeaderPages.includes(location.pathname);

// ✅ Pages with SIMPLE navbar
const simpleHeaderPages = [
  "/forgot-password",
  "/verify-otp",
  "/reset-password",
];

const hideFooterPages = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/verify-otp",
  "/reset-password",
];
const hideFooter = hideFooterPages.includes(location.pathname);
  return (
    <>
     
    <div className="flex flex-col min-h-screen">
       {!hideHeader && (
        <Navbar simple={simpleHeaderPages.includes(location.pathname)} />
        )}
       <main className="flex-grow mt-[60px]">
      
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Landing />} />
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
          {/* INFO PAGES */}
<Route
  path="/about"
  element={
    <ProtectedRoute>
      <About />
    </ProtectedRoute>
  }
/>



<Route
  path="/contact"
  element={
    <ProtectedRoute>
      <Contact />
    </ProtectedRoute>
  }
/>

<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
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
      
      </main>
      {!hideFooter && <Footer />}
      </div>
    </>
  );
}

/* ✅ App ONLY wraps Router */
export default function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-right" reverseOrder={false} />
      <AppLayout />
    </BrowserRouter>
  );
}