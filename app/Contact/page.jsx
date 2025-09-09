"use client";

import React, { useState } from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };

    try {
      const res = await fetch("/api/Contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        // ✅ Toast success
       toast.success("From Submit successfully! ", {
  position: "top-right", // positions: top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
});

        e.target.reset();
      } else {
        toast.error("Error sending message. Please try again.", {
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
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-black">
      <div className="max-w-6xl w-full bg-gray-900 shadow-2xl rounded-lg flex flex-col md:flex-row overflow-hidden">
        {/* Left side - Contact Info */}
        <div className="hidden md:flex w-full md:w-1/2 bg-gray-800 flex-col items-start justify-center p-10 space-y-6">
          <h2 className="text-white text-2xl font-semibold">Contact Information</h2>
          <div className="flex items-center space-x-4">
            <MapPin className="text-purple-400 w-5 h-5" />
            <p className="text-gray-300">123 Main Street, Pune, India</p>
          </div>
          <div className="flex items-center space-x-4">
            <Mail className="text-purple-400 w-5 h-5" />
            <p className="text-gray-300">sushilpawar2321@gmail.com</p>
          </div>
          <div className="flex items-center space-x-4">
            <Phone className="text-purple-400 w-5 h-5" />
            <p className="text-gray-300">+91 1234567890</p>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-1/2 p-8 bg-gray-900">
          <h2 className="text-2xl font-bold mb-6 text-white">Contact Us</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-300 mb-1">Name</label>
              <input
                type="text"
                name="name"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-800 text-white"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-800 text-white"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Subject</label>
              <input
                type="text"
                name="subject"
                required
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-800 text-white"
                placeholder="Enter subject"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Message</label>
              <textarea
                name="message"
                className="w-full border rounded px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-800 text-white"
                placeholder="Write your message..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-2 rounded-lg transition ${
                submitting
                  ? "bg-gray-500 cursor-not-allowed text-gray-200"
                  : "bg-purple-600 hover:bg-purple-700 text-white"
              }`}
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>

      {/* ✅ ToastContainer must be inside the component */}
      <ToastContainer />
    </div>
  );
}

export default ContactPage;
