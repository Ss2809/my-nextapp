"use client";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      name: e.target.name.value,
      phone: e.target.phone.value,
      date: e.target.date.value,
    };

    try {
      const res = await fetch("/api/Booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success(
          "Booking verification received! We will contact you within 24 hours.",
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          }
        );
        e.target.reset();
      } else {
        toast.error("Error saving data! Please try again.", {
          position: "top-center",
          autoClose: 5000,
          theme: "dark",
        });
      }
    } catch (err) {
      toast.error("Something went wrong! Please try later.", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-xl shadow-lg text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Verification Form</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-gray-300 mb-1">Name</label>
            <input
              type="text"
              name="name"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-gray-300 mb-1">Contact No</label>
            <input
              type="text"
              name="phone"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
              placeholder="Enter your contact no"
              required
            />
          </div>

          {/* Date Field */}
          <div>
            <label className="block text-gray-300 mb-1">Date</label>
            <input
              type="date"
              name="date"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg transition ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}
