import { useEffect, useState } from "react";
import API from "../api/axios";

export default function AdminRooms() {
const [rooms, setRooms] = useState([]);
const [name, setName] = useState("");
const [capacity, setCapacity] = useState("");
const [location, setLocation] = useState("");
const [error, setError] = useState("");

const fetchRooms = async () => {
try {
const res = await API.get("/rooms");
setRooms(res.data);
} catch {
setError("Failed to load rooms");
}
};

useEffect(() => {
fetchRooms();
}, []);

const addRoom = async (e) => {
e.preventDefault();
setError("");


if (!name || !capacity || !location) {
  setError("All fields are required");
  return;
}

try {
  await API.post("/rooms", { name, capacity, location });
  setName("");
  setCapacity("");
  setLocation("");
  fetchRooms();
} catch {
  setError("Only admin can add rooms");
}


};

const deleteRoom = async (id) => {
if (!window.confirm("Delete this room?")) return;


try {
  await API.delete(`/rooms/${id}`);
  fetchRooms();
} catch {
  setError("Delete failed");
}

};

return ( <div className="dashboard-page page-fade min-h-[calc(100vh-60px)]">


  {/* HEADER */}
  <div className="dashboard-header mb-8">
    <h1 className="dashboard-title">Admin – Manage Rooms</h1>
    <p className="dashboard-subtitle">
      Add and manage available rooms
    </p>
  </div>

  {error && <p className="text-red-600 mb-4">{error}</p>}

  {/* ADD ROOM FORM */}
  <form onSubmit={addRoom} className="flex flex-wrap gap-3 mb-16">

    <input
      className="border p-2 rounded-md"
      placeholder="Room Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />

    <input
      className="border p-2 rounded-md"
      type="number"
      placeholder="Capacity"
      value={capacity}
      onChange={(e) => setCapacity(e.target.value)}
    />

    <input
      className="border p-2 rounded-md"
      placeholder="Location"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
    />

    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md transition">
      Add Room
    </button>

  </form>

  {/* AVAILABLE ROOMS TITLE */}
  <div className="mb-10">
    <h2 className="text-lg font-semibold text-slate-800">
      Available Rooms
    </h2>
  </div>

  {/* ROOMS GRID */}
  {rooms.length === 0 && (
    <p className="text-slate-500">No rooms found</p>
  )}

  <div className="dashboard-grid">

    {rooms.map((room) => (
      <div
        key={room._id}
        className="dashboard-card flex flex-col justify-between"
      >

        <div>
          <h3 className="text-lg font-semibold text-indigo-600 mb-2">
            {room.name}
          </h3>

          <p className="text-sm text-slate-600 mb-1">
            👥 Capacity: <strong>{room.capacity}</strong>
          </p>

          <p className="text-sm text-slate-600">
            📍 Location: <strong>{room.location}</strong>
          </p>
        </div>

        <button
          onClick={() => deleteRoom(room._id)}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md text-sm transition"
        >
          Delete Room
        </button>

      </div>
    ))}

  </div>

</div>

);
}
