"use client";
import React from "react";
import { ArrowRight, Menu } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="w-full min-h-screen bg-black text-white p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">

        {/* LEFT BIG HERO WITH VIDEO */}
        <div className="relative lg:col-span-2 rounded-2xl overflow-hidden">
          <video
            src="/vedio.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-[65vh] md:h-[80vh] lg:h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>

          <div className="absolute bottom-10 left-10">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-tight">
              SUSHI <br /> SENSATION
            </h1>
          </div>

          {/* Top Navigation */}
          <div className="absolute top-6 left-6 flex items-center gap-4 bg-black/40 px-5 py-3 rounded-xl backdrop-blur-sm">
            <Menu className="h-6 w-6 cursor-pointer" />
            <h2 className="text-xl tracking-wide font-semibold">QITCHEN</h2>

            <nav className="hidden md:flex items-center gap-5 text-sm">
              <a href="#">MENU</a>
              <a href="#">ABOUT</a>
              <a
                href="#"
                className="bg-white text-black px-4 py-2 rounded-md text-xs font-semibold"
              >
                BOOK A TABLE
              </a>
            </nav>
          </div>
        </div>

        {/* RIGHT SIDE BENTO GRID */}
        <div className="flex flex-col gap-6">

          {[
            { img: "/h1.avif", title: "MENU", desc: "Discover our signature dishes" },
            { img: "/h2.avif", title: "RESERVATION", desc: "Book your dining experience" },
            { img: "/h3.avif", title: "OUR PLACE", desc: "Explore our restaurant story" },
          ].map((item, index) => (
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden h-48 md:h-56 cursor-pointer"
            >
              {/* IMAGE */}
              <img
                src={item.img}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt={item.title}
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all"></div>

              {/* TITLE */}
              <div
                className="
                  absolute bottom-4 right-4 flex items-center gap-1 
                  text-lg font-semibold tracking-wide
                  transition-all duration-500
                  group-hover:translate-y-[-20px] group-hover:opacity-0
                "
              >
                {item.title}
                <ArrowRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-2" />
              </div>

              {/* DESCRIPTION */}
              <div
                className="
                  absolute bottom-4 right-4 flex items-center gap-1
                   opacity-0
                  transition-all duration-500
                  group-hover:opacity-100 group-hover:translate-y-[-5px]
                "
              >
                {item.desc}
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-2" />
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
