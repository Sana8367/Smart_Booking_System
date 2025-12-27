import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Rooms() {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date || !startTime || !endTime) {
      alert("Please select date and time");
      return;
    }

    if (startTime >= endTime) {
      alert("End time must be after start time");
      return;
    }

    const newBooking = { date, startTime, endTime };

    const existing = JSON.parse(localStorage.getItem("mockBookings")) || [];
    localStorage.setItem("mockBookings", JSON.stringify([...existing, newBooking]));

    navigate("/my-bookings");
  };

   return (
  <div style={{ padding: "20px" }}>
    <h2>Book a Room</h2>

    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "400px",
        padding: "15px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <label>Date</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      <label>Start Time</label>
      <input
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      <label>End Time</label>
      <input
        type="time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "15px" }}
      />

      <button style={{ width: "100%", padding: "8px" }}>
        Book
      </button>
    </form>
  </div>
);

}
