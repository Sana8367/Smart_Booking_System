 import { useEffect, useState } from "react";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("mockBookings")) || [];
    setBookings(data);
  }, []);

  const cancelBooking = (index) => {
    const updated = bookings.filter((_, i) => i !== index);
    setBookings(updated);
    localStorage.setItem("mockBookings", JSON.stringify(updated));
  };

   return (
  <div style={{ padding: "20px" }}>
    <h2>My Bookings</h2>

    {bookings.length === 0 && (
      <p style={{ marginTop: "20px", color: "#555" }}>
        No bookings yet. Please book a room.
      </p>
    )}

    {bookings.map((b, index) => (
      <div
        key={index}
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "15px",
          marginTop: "15px",
          maxWidth: "400px",
        }}
      >
        <p><strong>Date:</strong> {b.date}</p>
        <p>
          <strong>Time:</strong> {b.startTime} – {b.endTime}
        </p>

        <button
          onClick={() => cancelBooking(index)}
          style={{
            marginTop: "10px",
            padding: "6px 12px",
            backgroundColor: "#e74c3c",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    ))}
  </div>
);

}
