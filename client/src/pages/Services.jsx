export default function Services() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-2">Room Booking</h2>
          <p className="text-gray-600">
            Students can view available rooms and book instantly.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-2">Booking Management</h2>
          <p className="text-gray-600">
            Track, cancel, and manage reservations easily.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-2">Admin Control</h2>
          <p className="text-gray-600">
            Admins can monitor bookings and manage rooms.
          </p>
        </div>

      </div>
    </div>
  );
}