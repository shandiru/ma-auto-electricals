"use client";
import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function GallerySection({ images }) {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  if (!images || images.length < 2) return null;

  const big = images.slice(0, 2);
  const thumbs = images.slice(2);

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isOpen, images.length]);

  const openPopup = (index) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section
      id="V-Gallery"
      className="py-10 md:py-16 bg-white rounded-3xl overflow-hidden relative shadow-lg"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10">

        {/* Heading */}
        <h2
          data-aos="fade-up"
          className="text-center text-3xl md:text-4xl font-bold text-[#317F21] mb-8"
        >
          Photo Gallery
        </h2>

        {/* Large Images */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {big.map((url, index) => (
            <div
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 150}
              className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
            >
              <img
                src={url}
                className="w-full h-64 md:h-80 object-cover cursor-pointer border-4 border-[#317F21] hover:scale-105 transition-transform"
                onClick={() => openPopup(index)}
              />
            </div>
          ))}
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-10 gap-3">
          {thumbs.map((url, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 50}
              className="rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={url}
                className="w-full h-24 object-cover cursor-pointer border-2 border-[#317F21]/50 hover:scale-105 transition-transform"
                onClick={() => openPopup(index + 2)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Watermark text behind gallery */}
      <div
        data-aos="fade-in"
        className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[90px] md:text-[140px] font-extrabold text-[#317F21]/10 pointer-events-none select-none"
      >
        Gallery
      </div>

      {/* Popup / Lightbox */}
      {isOpen && (
        <div
          data-aos="fade-in"
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
        >
          <button
            data-aos="fade-down"
            className="absolute top-6 right-6 text-[#317F21] text-3xl font-bold hover:opacity-90 transition"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>

          <img
            data-aos="zoom-in"
            src={images[activeIndex]}
            className="max-w-[90%] max-h-[80%] rounded-2xl shadow-2xl border-4 border-[#317F21] transition-all duration-300"
          />

          <button
            data-aos="fade-right"
            className="absolute left-6 top-1/2 -translate-y-1/2 text-[#317F21] text-5xl font-bold hover:opacity-80 transition"
            onClick={prevImage}
          >
            ‹
          </button>

          <button
            data-aos="fade-left"
            className="absolute right-6 top-1/2 -translate-y-1/2 text-[#317F21] text-5xl font-bold hover:opacity-80 transition"
            onClick={nextImage}
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
