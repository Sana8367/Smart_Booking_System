import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch rooms
  useEffect(() => {
    API.get("/rooms")
      .then((res) => setRooms(res.data))
      .catch(() => setError("Failed to load rooms"));
  }, []);

  // Fetch booked slots when room or date changes
  useEffect(() => {
    if (selectedRoom && date) {
      API.get(`/bookings/room/${selectedRoom._id}?date=${date}`)
        .then((res) => setBookedSlots(res.data))
        .catch(() => setBookedSlots([]));
    }
  }, [selectedRoom, date]);

  // Book room
  const bookRoom = async () => {
    setError("");
    setSuccess("");

    if (!date || !startTime || !endTime) {
      return setError("Please select date and time");
    }

    if (startTime >= endTime) {
      return setError("End time must be after start time");
    }

    try {
      await API.post("/bookings", {
        room: selectedRoom._id,
        date,
        startTime,
        endTime,
      });

      setSuccess("Room booked successfully!");
      setStartTime("");
      setEndTime("");

      // Refresh booked slots
      const res = await API.get(
        `/bookings/room/${selectedRoom._id}?date=${date}`
      );
      setBookedSlots(res.data);

    } catch (err) {
      setError(err.response?.data?.message || "Booking failed");
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
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px",
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

      {/* Booking Section */}
      {selectedRoom && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "2px solid black",
            borderRadius: "10px",
          }}
        >
          <h3>Book {selectedRoom.name}</h3>

          {/* Date */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <br /><br />

          {/* Time Selection */}
          <label>Start Time:</label>
          <br />
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />

          <br /><br />

          <label>End Time:</label>
          <br />
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />

          <br /><br />

          <button onClick={bookRoom}>Confirm Booking</button>
          <button
            onClick={() => {
              setSelectedRoom(null);
              setBookedSlots([]);
              setDate("");
            }}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>

          {/* Show Blocked Times */}
          {date && bookedSlots.length > 0 && (
            <div style={{ marginTop: "20px" }}>
              <h4>Blocked Time Slots:</h4>
              {bookedSlots.map((b) => (
                <p key={b._id} style={{ color: "red" }}>
                  {b.startTime} - {b.endTime}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}