import API from "../api/axios";
import { useEffect, useState } from "react";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await API.get("/bookings/my");
    setBookings(res.data);
  };

  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;

    await API.delete(`/bookings/${id}`);
    alert("Booking cancelled");
    fetchBookings();
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div>
      <h2>My Bookings</h2>

      {bookings.length === 0 && <p>No bookings found</p>}

      {bookings.map((b) => (
        <div key={b._id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
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
