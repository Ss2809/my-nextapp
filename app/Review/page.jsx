"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Star } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const getGradient = (name) => {
  const colors = [
    "from-pink-500 to-red-500",
    "from-blue-500 to-indigo-500",
    "from-green-500 to-emerald-500",
    "from-purple-500 to-violet-500",
    "from-orange-500 to-amber-500",
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

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
      return count === 1
        ? `${count} ${i.label} ago`
        : `${count} ${i.label}s ago`;
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
      toast.error("Please select a rating!", {
        position: "top-right",
        theme: "dark",
      });
      return;
    }

    setLoading(true);

    const data = {
      name: e.target.name.value.trim(),
      email: e.target.email.value.trim(),
      rating: Number(rating),
      comment: e.target.comment.value.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      await emailjs.send(
        "service_d4tr5j6",
        "template_foyxhma",
        { user_name: data.name, user_email: data.email },
        "ScHA4w3V4lD_tbY66"
      );

      await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      e.target.reset();
      setRating(0);
      fetchReviews();

      toast.success("Thank you for your review!", {
        position: "top-right",
        theme: "dark",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit review!", {
        position: "top-right",
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredReviews = [...reviews].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col items-center p-6 mt-15">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10">
        {/* LEFT SIDE FORM */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl rounded-3xl p-6"
        >
          <h2 className="text-2xl font-bold text-center mb-4 text-white">
            📝 Share Your Experience
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              placeholder="Your Name"
              required
              className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder-gray-400 focus:ring-2 focus:ring-pink-400 focus:outline-none"
            />
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              required
              className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder-gray-400 focus:ring-2 focus:ring-pink-400 focus:outline-none"
            />

            {/* Star Rating */}
            <div className="flex items-center gap-2">
              <span className="text-gray-300 font-medium text-sm">Rating:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={22}
                  className={`cursor-pointer transition-transform ${
                    (hover || rating) >= star
                      ? "fill-yellow-400 text-yellow-400 scale-110"
                      : "text-gray-500 hover:scale-105"
                  }`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                />
              ))}
            </div>

            <textarea
              name="comment"
              placeholder="Write your review..."
              required
              rows={3}
              className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder-gray-400 focus:ring-2 focus:ring-pink-400 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-xl text-white text-sm font-semibold transition-all duration-300 ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-pink-500 to-blue-500 hover:scale-[1.02] hover:shadow-lg"
              }`}
            >
              {loading ? "Posting..." : "🚀 Post Review"}
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="md:flex-1 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence>
            {filteredReviews.length === 0 ? (
              <p className="text-gray-400 text-center italic col-span-full">
                No reviews yet. Be the first to share!
              </p>
            ) : (
              filteredReviews.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 
                     hover:border-pink-400/50 hover:shadow-xl hover:scale-[1.02] 
                     transition-all flex flex-col space-y-2"
                >
                  <div className="flex gap-3 items-start">
                    <div
                      className={`w-9 h-9 rounded-full bg-gradient-to-br ${getGradient(
                        r.name
                      )} flex items-center justify-center font-bold text-sm text-white`}
                    >
                      {getInitials(r.name)}
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium text-sm">
                          {r.name}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {timeAgo(r.createdAt)}
                        </span>
                      </div>

                      {/* Stars */}
                      <div className="flex gap-0.5 my-0.5">
                        {Array.from({ length: r.rating }).map((_, idx) => (
                          <Star
                            key={idx}
                            size={12}
                            className="fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Comment section grows dynamically */}
                  <p className="text-gray-300 text-sm leading-snug break-words">
                    “{r.comment}”
                  </p>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <ToastContainer />
    </div>
  );
}
