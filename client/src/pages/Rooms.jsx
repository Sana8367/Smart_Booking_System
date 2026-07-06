import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../api/axios";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [error, setError] = useState("");

  /* Fetch rooms */
  useEffect(() => {
    API.get("/rooms")
      .then((res) => setRooms(res.data))
      .catch(() => setError("Failed to load rooms"));
  }, []);

  /* Fetch booked slots */
  useEffect(() => {
    if (selectedRoom && date) {
      API.get(`/bookings/room/${selectedRoom._id}?date=${date}`)
        .then((res) => setBookedSlots(res.data))
        .catch(() => setBookedSlots([]));
    }
  }, [selectedRoom, date]);

  /* Book room */
  const bookRoom = async () => {
    if (!date || !startTime || !endTime) {
      toast.error("Please select date and time");
      return;
    }

    if (startTime >= endTime) {
      toast.error("End time must be after start time");
      return;
    }

    try {
      await API.post("/bookings", {
        room: selectedRoom._id,
        date,
        startTime,
        endTime,
      });

      toast.success("Room booked successfully ✅");

      setStartTime("");
      setEndTime("");

      const res = await API.get(
        `/bookings/room/${selectedRoom._id}?date=${date}`
      );

      setBookedSlots(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed ❌");
    }
  };

  return (
    <div className="dashboard-page page-fade min-h-[calc(100vh-60px)]">

      {/* HEADER */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Available Rooms</h1>
        <p className="dashboard-subtitle">
          Browse and book available rooms
        </p>
      </div>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      {/* ROOM CARDS */}
      <div className="dashboard-grid">
        {rooms.map((room) => (
          <div key={room._id} className="dashboard-card">

            <h3 className="text-lg font-semibold mb-2 text-indigo-600">
              {room.name}
            </h3>

            <p className="text-slate-600 mb-1">
              👥 Capacity: <strong>{room.capacity}</strong>
            </p>

            <p className="text-slate-600 mb-4">
              📍 Location: <strong>{room.location}</strong>
            </p>

            <button
              onClick={() => setSelectedRoom(room)}
              className="w-full py-2 rounded-lg text-white font-medium transition transform hover:scale-105"
            >
              Book Room
            </button>
          </div>
        ))}
      </div>

      {/* BOOKING MODAL */}
      {selectedRoom && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setSelectedRoom(null)}
        >

          <div
            className="bg-white rounded-2xl shadow-2xl p-8 w-[420px] animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >

            <h2 className="text-2xl font-bold mb-4 text-indigo-600">
              Book {selectedRoom.name}
            </h2>

            <div className="space-y-3">

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border p-2 rounded-lg"
              />

              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full border p-2 rounded-lg"
              />

              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full border p-2 rounded-lg"
              />

            </div>

            {date && bookedSlots.length > 0 && (
              <div className="bg-red-100 border border-red-300 rounded-lg p-3 mt-4">

                <p className="text-red-600 font-semibold mb-1">
                  Already Booked
                </p>

                {bookedSlots.map((b) => (
                  <p key={b._id} className="text-sm">
                    {b.startTime} - {b.endTime}
                  </p>
                ))}

              </div>
            )}

            <div className="flex gap-3 mt-5">

              <button
                onClick={bookRoom}
                className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
              >
                Confirm
              </button>

              <button
                onClick={() => setSelectedRoom(null)}
                className="flex-1 border py-2 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}