"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";
import { ConfettiButton } from "@/components/magicui/confetti";
const Images = [
  "/i1.jpg",
  "/i2.jpg",
  "/i3.jpg",
  "/i4.jpg",
  "/i5.jpg",
  "/i6.jpg",
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const slideDuration = 7000;
    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setProgress(Math.min((elapsed / slideDuration) * 100, 100));
    }, 30);

    const slideTimeout = setTimeout(() => {
      setIndex((prev) => (prev + 1) % Images.length);
    }, slideDuration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(slideTimeout);
    };
  }, [index]);

  return (
    <div className="slider relative w-screen h-screen overflow-hidden">
      {Images.map((img, i) => (
        <div key={i} className={`slide ${i === index ? "active" : ""}`}>
          <Image
            src={img}
            alt={`Slide ${i + 1}`}
            fill
            className="object-cover"
            priority={i === index}
          />
          <div className="overlay" />
        </div>
      ))}

      <div className="absolute mt-72 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center max-w-3xl px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg font-poppins">
          BOOK YOUR PHOTO TOUR!
        </h1>
        <p className="text-lg md:text-xl text-gray-200 leading-relaxed drop-shadow-sm mb-6 font-poppins">
          Photo tour for creative souls, Germany, 20 - 24 October 2025.
          Intensive photo tour includes creating photos for your portfolio in 3
          different locations and one special day of shooting owls at a sunset
          scenery.
        </p>

        <Link
          href="/Booking"
          className="relative inline-flex items-center justify-center px-4 py-2 rounded-xl font-poppins font-bold
             text-white border-2 border-white bg-white/10 backdrop-blur-md
             shadow-lg hover:bg-white hover:text-purple-600 transition-all duration-300
             transform hover:scale-105 group"
        >
         <ConfettiButton > Book Now</ConfettiButton> 
          <span className="ml-2 transition-transform group-hover:translate-x-2">
            ➔
          </span>
        </Link>
      </div>

      <div className="bottom-center">
        <div className="progress">
          <div className="bar" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <style jsx>{`
        .slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 1s ease-in-out;
        }
        .slide.active {
          opacity: 1;
        }
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
        }
        .bottom-center {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          width: 80%;
        }
        .progress {
          width: 60%;
          height: 2px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
          overflow: hidden;
        }
        .bar {
          height: 100%;
          background: white;
          transition: width 0.03s linear;
        }
      `}</style>
    </div>
  );
}
