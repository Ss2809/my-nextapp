"use client";
import React from "react";

const shops = [
  { id: 1, name: "SK Photoshop", owner: "John Doe", image: "/img5.jpg", location: "https://maps.app.goo.gl/z6TACMRNtBMJFN8J8" },
  { id: 2, name: "Ak_photography& films", owner: "Emma Smith", image: "/img4.jpg", location: "https://maps.app.goo.gl/qnTM7krV2QvAXT1r6" },
  { id: 3, name: "Sunshine Photo Studio", owner: "Tejas Gholap", image: "/img3.jpg", location: "https://maps.app.goo.gl/CxhjNtL9AoX9L3Y19" },
  { id: 4, name: "Sushiii Clickerrrr", owner: "Sushil", image: "/img2.jpg", location: "https://maps.app.goo.gl/CxhjNtL9AoX9L3Y19" },
];

export default function ShopPage() {
  return (
    <div className="min-h-screen px-8 py-10 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 overflow-y-auto">
      <h1 className="text-5xl font-bold text-center font-[Poppins] tracking-tight mt-6 text-gray-800 drop-shadow-lg">
        Our Shops
      </h1>

      {/* Shop Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
        {shops.map((shop) => (
          <div
            key={shop.id}
            className="relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Shop Image with hover effect */}
            <img
              src={shop.image}
              alt={shop.name}
              className="h-56 w-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105 hover:translate-y-1"
            />

            {/* Coming Soon overlay text on image for id 4 */}
            {shop.id === 4 && (
              <div className="absolute top-2 left-2 bg-yellow-300 bg-opacity-80 px-3 py-1 rounded font-bold text-black">
                Coming Soon
              </div>
            )}

            {/* Shop Name + Owner + Button */}
            <div className="p-4 flex flex-col items-center space-y-2">
              <h2 className="text-lg font-semibold text-center">{shop.name}</h2>
              <span className="text-gray-500 text-sm">Owner: {shop.owner}</span>

              {/* View Location button only for shops not coming soon */}
              {shop.id !== 4 && (
                <a
                  href={shop.location}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
                >
                  View Location
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
