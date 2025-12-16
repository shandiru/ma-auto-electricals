"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function UnderTheBonnet({ items }) {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="w-full px-4 py-12 bg-[#0B1F1A] text-[#EAFBEA]">

      <h2
        data-aos="fade-up"
        className="text-center text-3xl md:text-4xl font-bold mb-10 text-[#72EF36]"
      >
        Under the Bonnet
      </h2>

      <div
        data-aos="fade-up"
        className="bg-[#0B1F1A] rounded-2xl py-10 px-4 shadow-lg shadow-black/40"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">

          {items?.map((item, index) => (
            <div
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 80}
              className="bg-[#1A5E20] rounded-xl p-5 text-center flex flex-col items-center justify-center shadow-md shadow-black/40 border border-[#72EF36]/20"
            >
              <img src={item.icon} className="w-10 h-10 my-3" />
              <span className="text-[#CFFFD6] text-sm">
                {item.title}
              </span>
              <strong className="text-[#72EF36] text-xl font-bold mt-1">
                {item.value}
              </strong>
            </div>
          ))}

        </div>

        <div data-aos="fade-up" className="text-center mt-8">
          <a
            href="#"
            className="text-[#72EF36] font-semibold underline underline-offset-4 opacity-80 hover:opacity-100 transition"
          >
            View full technical data
          </a>
        </div>
      </div>
    </div>
  );
}
