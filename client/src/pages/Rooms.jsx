import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch rooms
  useEffect(() => {
    API.get("/rooms")
      .then((res) => setRooms(res.data))
      .catch(() => setError("Failed to load rooms"));
  }, []);

  // Book room
const bookRoom = async () => {
  setError("");
  setSuccess("");

  try {
    console.log("BOOKING DATA:", {
      room: selectedRoom._id,
      date,
      timeSlot,
    });

    const res = await API.post("/bookings", {
      room: selectedRoom._id,
      date,
      timeSlot,
    });

    console.log("BOOKING RESPONSE:", res.data);

    setSuccess("Room booked successfully!");
  } catch (err) {
    console.error("BOOKING ERROR:", err.response?.data || err.message);
    setError("Booking failed");
  }
};


  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Rooms</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      {/* Rooms List */}
      {rooms.map((room) => (
        <div
          key={room._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{room.name}</h3>
          <p>Capacity: {room.capacity}</p>
          <p>Location: {room.location}</p>

          <button onClick={() => setSelectedRoom(room)}>
            Book Room
          </button>
        </div>
      ))}

      {/* Booking Modal (Simple) */}
      {selectedRoom && (
        <div style={{ border: "1px solid black", padding: "15px" }}>
          <h3>Book {selectedRoom.name}</h3>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <select
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
          >
            <option value="">Select Time</option>
            <option value="09:00-10:00">09:00-10:00</option>
            <option value="10:00-11:00">10:00-11:00</option>
            <option value="11:00-12:00">11:00-12:00</option>
          </select>

          <br /><br />

          <button onClick={bookRoom}>Confirm Booking</button>
          <button onClick={() => setSelectedRoom(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
