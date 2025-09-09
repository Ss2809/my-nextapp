"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Star } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import "react-toastify/dist/ReactToastify.css";

// Avatar Colors
const COLORS = [
  "bg-gradient-to-br from-purple-500 to-indigo-500",
  "bg-gradient-to-br from-blue-500 to-cyan-500",
  "bg-gradient-to-br from-emerald-500 to-teal-500",
  "bg-gradient-to-br from-pink-500 to-rose-500",
  "bg-gradient-to-br from-orange-500 to-amber-500",
];
const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];
const getInitials = (name) =>
  name.split(" ").map((n) => n[0]).join("").toUpperCase();

const timeAgo = (date) => {
  const seconds = Math.floor((Date.now() - new Date(date)) / 1000);
  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];
  for (let i of intervals) {
    const count = Math.floor(seconds / i.seconds);
    if (count > 0)
      return count === 1 ? `${count} ${i.label} ago` : `${count} ${i.label}s ago`;
  }
  return "just now";
};

export default function ReviewForm() {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch("/api/review");
      const data = await res.json();
      if (Array.isArray(data)) setReviews(data);
      else if (Array.isArray(data.reviews)) setReviews(data.reviews);
    } catch {
      setReviews([]);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating!", { position: "top-right", theme: "dark" });
      return;
    }

    setLoading(true);

    const data = {
      name: e.target.name.value.trim(),
      email: e.target.email.value.trim(),
      rating: Number(rating),
      comment: e.target.comment.value.trim(),
      color: getRandomColor(),
      createdAt: new Date().toISOString(),
    };

    try {
     

      await emailjs.send(
        "service_d4tr5j6",
        "template_foyxhma", 
        {
          user_name: data.name,
          user_email: data.email,
        },
        "ScHA4w3V4lD_tbY66"
      );

      // Save review to backend
      await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      e.target.reset();
      setRating(0);
      fetchReviews();

      toast.success("Thank you for your review!", { position: "top-right", theme: "dark" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit review!", { position: "top-right", theme: "dark" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-purple-200 to-pink-300 flex justify-center items-start py-16 px-6">
      <div className="max-w-7xl w-full flex flex-col md:flex-row gap-10">
        {/* Review Form */}
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
          <h2 className="text-3xl font-extrabold text-center mb-8 text-white">
            Leave a Review
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              name="name"
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-black/40 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-black/40 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            {/* Star Rating */}
            <div className="flex items-center gap-3">
              <span className="text-gray-200">Rating:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={26}
                  className={`cursor-pointer transition-transform duration-200 ${
                    (hover || rating) >= star
                      ? "fill-yellow-400 text-yellow-400 scale-110"
                      : "text-gray-400 hover:scale-110"
                  }`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                />
              ))}
            </div>
            <textarea
              name="comment"
              placeholder="Your Review"
              required
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-black/40 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-semibold tracking-wide shadow-lg transition ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-pink-500 to-blue-600 hover:from-pink-600 hover:to-blue-700"
              }`}
            >
              {loading ? "Posting..." : "Post Review"}
            </button>
          </form>
        </div>

        {/* Reviews List */}
        <div className="flex-1 h-[400px] md:h-[75vh] overflow-y-auto bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-white/20">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">Customer Reviews</h2>
          <div className="flex flex-col space-y-6">
            {reviews.length === 0 ? (
              <p className="text-gray-200 text-center">No reviews yet.</p>
            ) : (
              reviews.map((r, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-r from-gray-800/70 to-gray-900/70 p-5 rounded-2xl shadow-lg border border-gray-700 flex gap-4 items-start hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >
                  <div
                    className={`w-14 h-14 flex items-center justify-center rounded-full font-bold text-white shadow-md ${r.color || getRandomColor()} text-lg`}
                  >
                    {getInitials(r.name)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <strong className="text-white text-lg">{r.name}</strong>
                      <div className="flex gap-1">
                        {Array.from({ length: r.rating }).map((_, idx) => (
                          <Star key={idx} size={18} className="fill-yellow-400 text-yellow-400" />
                        ))}
                        {Array.from({ length: 5 - r.rating }).map((_, idx) => (
                          <Star key={idx} size={18} className="text-gray-500" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-200 leading-relaxed">{r.comment}</p>
                    <p className="text-gray-400 text-sm mt-2">{timeAgo(r.createdAt)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
