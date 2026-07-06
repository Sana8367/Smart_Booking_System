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
fetchBookings();


};

useEffect(() => {
fetchBookings();
}, []);

return ( <div className="dashboard-page page-fade min-h-[calc(100vh-60px)]">

  {/* HEADER */}
  <div className="dashboard-header mb-8">
    <h1 className="dashboard-title">My Bookings</h1>
    <p className="dashboard-subtitle">
      View and manage your reservations
    </p>
  </div>

  {bookings.length === 0 && (
    <div className="text-center text-slate-500 mt-10">
      No bookings found
    </div>
  )}

  {/* BOOKINGS GRID */}
  <div className="dashboard-grid">

    {bookings.map((b) => (
      <div
        key={b._id}
        className="dashboard-card flex flex-col justify-between"
      >

        {/* ROOM DETAILS */}
        <div>
          <h3 className="text-lg font-semibold text-indigo-600 mb-3">
            {b.room?.name || "Room"}
          </h3>

          <p className="text-sm text-slate-600 mb-1">
            📅 <span className="font-medium">{b.date}</span>
          </p>

          <p className="text-sm text-slate-600">
            ⏰ <span className="font-medium">
              {b.startTime} - {b.endTime}
            </span>
          </p>
        </div>

        {/* CANCEL BUTTON */}
        <button
          onClick={() => cancelBooking(b._id)}
          className="mt-5 w-full bg-red-500 hover:bg-red-600 active:scale-95 text-white py-2 rounded-lg text-sm transition"
        >
          Cancel Booking
        </button>

      </div>
    ))}

  </div>

</div>

);
}
