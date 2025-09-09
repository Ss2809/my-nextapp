"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-90">
      {/* Spinner */}
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent border-b-transparent rounded-full animate-spin"></div>
        <p className="text-white mt-4 text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
}
