import { useEffect, useState } from "react";
import API from "../api/axios";
import { useAuth } from "../auth/AuthContext";

export default function AdminBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [date, setDate] = useState("");

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        params: date ? { date } : {},
      });

      setBookings(res.data);
    } catch (err) {
      alert("Failed to load bookings");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const cancelBooking = async (id) => {
    await API.delete(`/bookings/admin/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    fetchBookings();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin – All Bookings</h2>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={fetchBookings}>Filter</button>

      {bookings.length === 0 && <p>No bookings found</p>}

      {bookings.map((b) => (
        <div key={b._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <p><b>User:</b> {b.user?.name} ({b.user?.email})</p>
          <p><b>Room:</b> {b.room?.name}</p>
          <p><b>Date:</b> {b.date}</p>
          <p><b>Time:</b> {b.timeSlot}</p>

          <button onClick={() => cancelBooking(b._id)}>
            Cancel Booking
          </button>
        </div>
      ))}
    </div>
  );
}
