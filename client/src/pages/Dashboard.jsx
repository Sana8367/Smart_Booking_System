import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { FaDoorOpen, FaClipboardList } from "react-icons/fa";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect if not logged in or admin
  if (!user) return <Navigate to="/login" />;
  if (user.role === "admin") return <Navigate to="/admin/rooms" />;

  return (
    <div className="page-fade">

      {/* ===== HERO SECTION (UNCHANGED) ===== */}
      <section
        className="h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1524758631624-e2822e304c36')",
        }}
      >
        <div className="bg-black/50 px-10 py-8 rounded-xl text-center">
          <h1 className="text-4xl font-bold text-white mb-3">
            Welcome {user?.name || "User"} 👋
          </h1>
          <p className="text-gray-200">
            Manage room reservations easily and efficiently
          </p>
        </div>
      </section>

      {/* ===== DASHBOARD CONTENT AFTER SCROLL ===== */}
      <div className="dashboard-page dashboard-container">

        <h2 className="dashboard-title">
          What would you like to do today?
        </h2>
        <p className="dashboard-subtitle">
          Choose an option below to continue
        </p>

        <div className="dashboard-grid">

          {/* AVAILABLE ROOMS */}
          <div
            className="dashboard-card"
            onClick={() => navigate("/rooms")}
          >
            <FaDoorOpen size={32} style={{ marginBottom: "10px" }} />
            <h3>Available Rooms</h3>
            <p>Browse and book available rooms</p>
          </div>

          {/* MY BOOKINGS */}
          <div
            className="dashboard-card"
            onClick={() => navigate("/my-bookings")}
          >
            <FaClipboardList size={32} style={{ marginBottom: "10px" }} />
            <h3>My Bookings</h3>
            <p>View your booked rooms</p>
          </div>

        </div>
      </div>
    </div>
  );
}