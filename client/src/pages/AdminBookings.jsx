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
} catch {
  alert("Failed to load bookings");
}


};

useEffect(() => {
if (user?.token) {
fetchBookings();
}
}, [user]);

const cancelBooking = async (id) => {
if (!window.confirm("Cancel this booking?")) return;


await API.delete(`/bookings/admin/${id}`, {
  headers: {
    Authorization: `Bearer ${user.token}`,
  },
});

fetchBookings();


};

return ( <div className="dashboard-page page-fade min-h-[calc(100vh-60px)]">

  {/* HEADER */}
  <div className="dashboard-header mb-8">
    <h1 className="dashboard-title">Admin – All Bookings</h1>
    <p className="dashboard-subtitle">
      View and manage all room reservations
    </p>
  </div>

  {/* FILTER SECTION */}
  <div className="flex flex-wrap items-center gap-3 mb-24">

    <input
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
      className="border p-2 rounded-md"
    />

    <button
      onClick={fetchBookings}
      className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md transition"
    >
      Filter
    </button>

  </div>

  {/* BOOKINGS GRID */}
  {bookings.length === 0 && (
    <p className="text-slate-500">No bookings found</p>
  )}

  <div className="dashboard-grid">

    {bookings.map((b) => (
      <div
        key={b._id}
        className="dashboard-card flex flex-col justify-between"
      >

        <div>

          <h3 className="text-lg font-semibold text-indigo-600 mb-2">
            {b.room?.name}
          </h3>

          <p className="text-sm text-slate-600 mb-1">
            👤 <strong>User:</strong> {b.user?.name}
          </p>

          <p className="text-sm text-slate-600 mb-1">
            📧 <strong>Email:</strong> {b.user?.email}
          </p>

          <p className="text-sm text-slate-600 mb-1">
            📅 <strong>Date:</strong> {b.date}
          </p>

          <p className="text-sm text-slate-600">
            ⏰ <strong>Time:</strong> {b.startTime} - {b.endTime}
          </p>

        </div>

        <button
          onClick={() => cancelBooking(b._id)}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md text-sm transition"
        >
          Cancel Booking
        </button>

      </div>
    ))}

  </div>

</div>


);
}
