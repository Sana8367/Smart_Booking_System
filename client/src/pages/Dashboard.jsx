import { useAuth } from "../auth/AuthContext";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  if (user.role === "admin") {
    return <Navigate to="/admin/rooms" />;
  }

  return <Navigate to="/rooms" />;
}
