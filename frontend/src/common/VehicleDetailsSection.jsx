"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function VehicleDetailsSection({ data }) {
  const { description, features, videoUrl } = data;

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="bg-[#020000] text-[#FCFCFC] py-16 px-6 md:px-10 lg:px-0">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">

        {/* Heading */}
        <h2
          data-aos="fade-up"
          className="text-center text-3xl md:text-4xl font-bold"
        >
          More about this Renault
        </h2>

        {/* DESCRIPTION + FEATURES GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* LEFT — FULL DESCRIPTION */}
          <div
            data-aos="fade-right"
            className="bg-[#3F2E31] rounded-2xl border border-[#A7A1A2]/20 p-6 md:p-8 shadow-md shadow-[#3F2E31] flex flex-col"
          >
            <h3 className="text-2xl font-semibold mb-4 text-[#FCFCFC]">
              Full Description
            </h3>

            {/* Updated description to preserve line breaks */}
            <p className="text-[#A7A1A2] whitespace-pre-wrap leading-relaxed flex-1">
              {description}
            </p>

            <button className="mt-6 self-start border border-[#B40B1F] text-[#B40B1F] text-sm px-5 py-2 rounded-lg hover:bg-[#B40B1F] hover:text-[#FCFCFC] transition">
              Read Full Description
            </button>
          </div>

          {/* RIGHT — HIGHLIGHT FEATURES */}
          <div data-aos="fade-left">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-2xl font-semibold text-[#FCFCFC]">
                Highlight Features
              </h3>
              <button className="border border-[#B40B1F] text-[#B40B1F] text-sm px-4 py-2 rounded-lg hover:bg-[#B40B1F] hover:text-[#FCFCFC] transition">
                View All
              </button>
            </div>

            <div className="bg-[#3F2E31] rounded-2xl p-6 md:p-8 shadow-md shadow-[#3F2E31] relative">
              <div className="flex flex-col gap-4">
                {features?.map((item, index) => (
                  <div
                    key={index}
                    data-aos="fade-up"
                    data-aos-delay={index * 80}
                    className="border-b border-[#A7A1A2]/20 pb-3 flex items-start gap-3"
                  >
                    <span className="text-[#B40B1F] mt-1 text-xs">►</span>
                    <span className="text-[#FCFCFC]">{item}</span>
                  </div>
                ))}
              </div>

              <div className="absolute text-6xl font-bold text-[#A7A1A2]/10 right-4 bottom-4 pointer-events-none select-none">
                Features
              </div>
            </div>
          </div>
        </div>

        {/* VIDEO SECTION */}
       

        {/* DELIVERY QUOTE CARD */}
<div
  data-aos="fade-up"
  className="bg-[#3F2E31] rounded-2xl text-center py-10 px-6 shadow-md shadow-[#3F2E31]"
>
  <h3 className="text-3xl font-semibold mb-6 text-[#FCFCFC]">
    Wish to get this delivered? Get a Quote!
  </h3>

  {/* CTA BUTTON ONLY */}
  <div className="max-w-xl mx-auto">
    <button className="bg-[#B40B1F] text-[#FCFCFC] px-8 py-3 rounded-lg font-semibold hover:bg-[#FCFCFC] hover:text-[#B40B1F] transition">
      Get a Quote
    </button>
  </div>

  <p className="text-[#A7A1A2] text-sm mt-4">
    Delivery to mainland UK only, excludes NI, highlands, ferry crossing and toll costs.
  </p>
</div>

      </div>
    </section>
  );
}
