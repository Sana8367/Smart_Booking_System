const express = require("express");
const router = express.Router();

const {
  createBooking,
  myBookings,
  cancelBooking,
  adminBookings,
  adminCancelBooking,
} = require("../controllers/bookingController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const Booking = require("../models/Booking");


/* ===========================
   STUDENT ROUTES
=========================== */

// Create booking
router.post("/", protect, createBooking);

// Get logged-in student's bookings
router.get("/my", protect, myBookings);

// Cancel own booking
router.delete("/:id", protect, cancelBooking);


/* ===========================
   FETCH BOOKINGS FOR A ROOM (FOR BLOCKED TIMES)
=========================== */

router.get("/room/:roomId", protect, async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const bookings = await Booking.find({
      room: req.params.roomId,
      date,
    }).sort({ startTime: 1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch room bookings" });
  }
});


/* ===========================
   ADMIN ROUTES
=========================== */

// View all bookings (optional date filter)
router.get("/", protect, adminOnly, adminBookings);

// Admin cancel any booking
router.delete("/admin/:id", protect, adminOnly, adminCancelBooking);

module.exports = router;