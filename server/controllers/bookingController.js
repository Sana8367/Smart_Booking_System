const Booking = require("../models/Booking");

const isExpiredBooking = (booking) => {
  const now = new Date();

  const bookingDate = new Date(booking.date);
  bookingDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // If booking date is before today → expired
  if (bookingDate < today) return true;

  // If booking is today, check timeSlot end
  if (bookingDate.getTime() === today.getTime()) {
    const endTime = booking.timeSlot.split("-")[1]; // "10:00"

    const [hours, minutes] = endTime.split(":");
    const bookingEndTime = new Date();
    bookingEndTime.setHours(hours, minutes, 0, 0);

    if (bookingEndTime < now) return true;
  }

  return false;
};


// CREATE BOOKING (Student)
exports.createBooking = async (req, res) => {
  try {
    const { room, date, timeSlot } = req.body;

    if (!room || !date || !timeSlot) {
      return res.status(400).json({ message: "All fields required" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const bookingDate = new Date(date);

    if (bookingDate < today) {
      return res.status(400).json({ message: "Cannot book past dates" });
    }

    const exists = await Booking.findOne({ room, date, timeSlot });
    if (exists) {
      return res.status(409).json({ message: "Slot already booked" });
    }

    const booking = await Booking.create({
      user: req.user.id,
      room,
      date,
      timeSlot,
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
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
