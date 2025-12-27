import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/rooms" style={{ marginRight: "10px" }}>Rooms</Link>
      <Link to="/my-bookings" style={{ marginRight: "10px" }}>My Bookings</Link>

      {user && (
        <button onClick={handleLogout} style={{ marginLeft: "20px" }}>
          Logout
        </button>
      )}
    </nav>
  );
}
