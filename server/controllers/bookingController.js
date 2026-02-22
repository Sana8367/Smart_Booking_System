const Booking = require("../models/Booking");

const isExpiredBooking = (booking) => {
  const now = new Date();

  const bookingDate = new Date(booking.date);
  bookingDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (bookingDate < today) return true;

  if (bookingDate.getTime() === today.getTime()) {
    if (!booking.endTime) return false;

    const [hours, minutes] = booking.endTime.split(":");

    const bookingEnd = new Date();
    bookingEnd.setHours(hours, minutes, 0, 0);

    if (bookingEnd < now) return true;
  }

  return false;
};

// CREATE BOOKING (Student)
exports.createBooking = async (req, res) => {
  try {
    const { room, date, startTime, endTime } = req.body;

    if (!room || !date || !startTime || !endTime) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (startTime >= endTime) {
      return res.status(400).json({ message: "Invalid time range" });
    }

    const existingBooking = await Booking.findOne({
      room,
      date,
      startTime: { $lt: endTime },
      endTime: { $gt: startTime },
    });

    if (existingBooking) {
      return res.status(409).json({
        message: "This time range is already booked",
      });
    }

    const booking = await Booking.create({
      user: req.user.id,
      room,
      date,
      startTime,
      endTime,
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: "Booking failed" });
  }
};

// STUDENT: MY BOOKINGS
exports.myBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("room")
      .sort({ date: 1 });

    // 🔥 Delete expired bookings
    for (const booking of bookings) {
      if (isExpiredBooking(booking)) {
        await Booking.findByIdAndDelete(booking._id);
      }
    }

    // Fetch again after cleanup
    const updatedBookings = await Booking.find({ user: req.user.id })
      .populate("room")
      .sort({ date: 1 });

    res.json(updatedBookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// STUDENT: CANCEL OWN BOOKING
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await booking.deleteOne();
    res.json({ message: "Booking cancelled successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ADMIN: VIEW ALL BOOKINGS (OPTIONAL DATE FILTER)
exports.adminBookings = async (req, res) => {
  try {
    const { date } = req.query;

    let filter = {};
    if (date) filter.date = date;

    const bookings = await Booking.find(filter)
      .populate("room")
      .populate("user", "name email role")
      .sort({ date: 1 });

    // 🔥 Delete expired bookings
    for (const booking of bookings) {
      if (isExpiredBooking(booking)) {
        await Booking.findByIdAndDelete(booking._id);
      }
    }

    // Fetch again after cleanup
    const updatedBookings = await Booking.find(filter)
      .populate("room")
      .populate("user", "name email role")
      .sort({ date: 1 });

    res.json(updatedBookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};


// ADMIN: CANCEL ANY BOOKING
exports.adminCancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await booking.deleteOne();
    res.json({ message: "Booking cancelled by admin" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
