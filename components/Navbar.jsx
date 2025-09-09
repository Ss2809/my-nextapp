"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { memo } from "react";

function Navbar() {
  const pathname = usePathname(); // get current route

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/Contact", label: "Contact" },
    { href: "/Booking", label: "Booking" },
    { href: "/shop", label: "Shop" },
    { href: "/gallery", label: "Gallery" },
    { href: "/Review", label: "Review" },
  ];

  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-gray-900 bg-opacity-50 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left Links */}
          <div className="flex space-x-8">
            {links.slice(0, 3).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium hover:text-blue-400 ${
                  pathname === link.href ? "text-blue-400" : "text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Center Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className="text-xl font-bold text-blue-400">
              <img
                src="/logo.jpg"
                alt="Logo"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #7b5cf5",
                }}
              />
            </Link>
          </div>

          {/* Right Links */}
          <div className="flex space-x-8">
            {links.slice(3).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium hover:text-blue-400 ${
                  pathname === link.href ? "text-blue-400" : "text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default memo(Navbar);
