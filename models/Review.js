import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },        // added email
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  color: { type: String },
}, { timestamps: true });

const Review = mongoose.models.Review || mongoose.model("Review", ReviewSchema);
export default Review;
