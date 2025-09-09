import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true },
}, { timestamps: true });

const Booking = mongoose.models.Booking || mongoose.model("Booking", BookingSchema);

export default Booking;
