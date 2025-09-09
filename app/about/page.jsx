"use client"
import React from "react";
import Image from "next/image";
import { FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa";

export default function AboutMe() {
  return (
    <section className="w-full py-16 px-4 bg-gray-50 mt-6.5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-10">

        {/* Image */}
        <div className="flex-1">
          <div className="relative rounded-xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&w=800"
              alt="Photographer"
              width={800}
              height={600}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>

        {/* About Text */}
        <div className="flex-1 flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-blue-900">About Me</h2>
          <p className="text-blue-800 leading-relaxed">
            Hi, I'm Sushil, a professional photographer with over 8 years of experience in capturing breathtaking landscapes and memorable portraits. I specialize in storytelling through my lens, creating moments that last forever.
          </p>

          <div className="bg-gray-100 p-4 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Experience</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>8+ years of professional photography</li>
              <li>Worked with clients worldwide</li>
              <li>Exhibited work in galleries and publications</li>
            </ul>
          </div>

          <div className="bg-gray-100 p-4 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Skills</h3>
            <p className="text-gray-600">
              Landscape Photography, Portrait Photography, Photo Editing, Lighting Techniques, Creative Direction
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Awards</h3>
            <p className="text-gray-600">
              Winner of International Landscape Photography Award 2022, Featured in National Geographic 2021
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-6 mt-4">
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-600 transition-colors text-2xl">
              <FaInstagram />
            </a>
            <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700 transition-colors text-2xl">
              <FaYoutube />
            </a>
           <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 transition-colors text-2xl">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.608 1.794-1.574 2.163-2.723-.949.564-2.005.974-3.127 1.195-.897-.959-2.178-1.555-3.594-1.555-2.723 0-4.928 2.205-4.928 4.928 0 .39.045.765.127 1.124-4.094-.205-7.725-2.166-10.152-5.144-.424.729-.666 1.577-.666 2.476 0 1.708.869 3.215 2.188 4.099-.807-.026-1.566-.247-2.229-.616v.062c0 2.386 1.697 4.374 3.946 4.828-.413.111-.849.171-1.296.171-.317 0-.626-.03-.927-.086.627 1.956 2.444 3.379 4.6 3.42-1.68 1.317-3.809 2.102-6.115 2.102-.398 0-.79-.023-1.175-.069 2.179 1.397 4.768 2.212 7.557 2.212 9.054 0 14.002-7.496 14.002-13.986 0-.21 0-.423-.015-.634.961-.694 1.8-1.562 2.46-2.549l-.047-.02z" />
  </svg>
</a>

          </div>

        </div>
      </div>
    </section>
  );
}
