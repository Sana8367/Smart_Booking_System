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




// Student
router.post("/", protect, createBooking);
router.get("/my", protect, myBookings);
router.delete("/:id", protect, cancelBooking);

// Admin
router.get("/", protect, adminOnly, adminBookings);
router.delete("/admin/:id", protect, adminOnly, adminCancelBooking);

module.exports = router;

