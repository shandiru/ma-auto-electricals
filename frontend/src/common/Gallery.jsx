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
      className="py-6 md:py-10 bg-[#0B1F1A] rounded-b-3xl overflow-hidden relative"
    >
      <div className="max-w-6xl mx-auto px-4 relative z-10">

        <h2
          data-aos="fade-up"
          className="text-center text-2xl md:text-3xl font-bold text-[#72EF36] mb-6"
        >
          Photo Gallery
        </h2>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {big.map((url, index) => (
            <div key={index} data-aos="zoom-in" data-aos-delay={index * 150}>
              <img
                src={url}
                className="w-full h-full object-cover rounded-lg cursor-pointer border border-[#72EF36]/20"
                onClick={() => openPopup(index)}
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-10 gap-2">
          {thumbs.map((url, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <img
                src={url}
                className="w-full h-full object-cover rounded-lg cursor-pointer border border-[#72EF36]/10"
                onClick={() => openPopup(index + 2)}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        data-aos="fade-in"
        className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[90px] md:text-[140px] font-extrabold text-[#72EF36]/10 pointer-events-none select-none"
      >
        Gallery
      </div>

      {isOpen && (
        <div
          data-aos="fade-in"
          className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-4"
        >
          <button
            data-aos="fade-down"
            className="absolute top-6 right-6 text-[#72EF36] text-3xl font-bold"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>

          <img
            data-aos="zoom-in"
            src={images[activeIndex]}
            className="max-w-[90%] max-h-[80%] rounded-xl shadow-xl border-4 border-[#72EF36] transition-all duration-300"
          />

          <button
            data-aos="fade-right"
            className="absolute left-6 top-1/2 -translate-y-1/2 text-[#72EF36] text-5xl font-bold hover:opacity-80"
            onClick={prevImage}
          >
            ‹
          </button>

          <button
            data-aos="fade-left"
            className="absolute right-6 top-1/2 -translate-y-1/2 text-[#72EF36] text-5xl font-bold hover:opacity-80"
            onClick={nextImage}
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
