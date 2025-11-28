"use client";
import React from "react";

export default function Contact() {
  return (
    <section className="w-full bg-black text-white py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* LEFT IMAGE HERO */}
        <div
          className="relative w-full h-80 md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: "url('/c1.avif')" }} // replace with your image
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <h2 className="relative text-4xl md:text-5xl lg:text-6xl font-serif text-white text-center">
            BOOK <br /> A TABLE
          </h2>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-gray-900/80 rounded-2xl p-6 md:p-10">
          <h3 className="text-2xl md:text-3xl font-serif text-center mb-4">
            RESERVATION
          </h3>
          <p className="text-gray-300 mb-6 text-center max-w-90 mx-auto">
            Secure your spot at Qitchen, where exceptional sushi and a remarkable dining experience await.
          </p>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-gray-300 mb-1 text-sm">NAME</label>
              <input
                type="text"
                placeholder="Jane Smith"
                className="bg-gray-800 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-300 mb-1 text-sm">EMAIL</label>
              <input
                type="email"
                placeholder="example@domain.com"
                className="bg-gray-800 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-300 mb-1 text-sm">PHONE NUMBER</label>
              <input
                type="text"
                placeholder="+420 123 456 789"
                className="bg-gray-800 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-300 mb-1 text-sm">PEOPLE</label>
              <input
                type="number"
                placeholder="1-10"
                className="bg-gray-800 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-300 mb-1 text-sm">DATE</label>
              <input
                type="date"
                className="bg-gray-800 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-300 mb-1 text-sm">TIME</label>
              <input
                type="time"
                className="bg-gray-800 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>

            <div className="md:col-span-2 mt-4 flex justify-center lg:justify-start">
              <button
                type="submit"
                className="bg-gold text-black font-semibold px-6 py-2 rounded-md hover:bg-yellow-500 transition"
              >
                Reserve Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
