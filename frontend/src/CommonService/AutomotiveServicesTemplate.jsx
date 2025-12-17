"use client";

import React from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function AutomotiveServicesTemplate({ data }) {
  return (
    <section className="py-16 bg-[#F9F9F9]  transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-[#111827] ">
            {data.heading.title}
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-[#4B5563] ">
            {data.heading.subtitle}
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {data.services.map((service, i) => {
            const Icon = service.icon;

            return (
              <div
                key={i}
                className="flex flex-col gap-6 rounded-xl py-6 px-6 shadow-sm border transition-all duration-300 
                bg-white  border-[#E6EAE7] 
                hover:shadow-[0_8px_24px_rgba(200,16,46,0.25)] 
                hover:ring-2 hover:ring-[#317F21] hover:ring-offset-2 hover:ring-offset-white 
                "
              >
                {/* Header */}
                <div className="grid auto-rows-min items-start gap-1.5">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#C6F0C2] ">
                      <Icon className="h-5 w-5 text-[#317F21] " />
                    </div>
                    <div className="text-xl font-bold text-[#111827] ">
                      {service.title}
                    </div>
                  </div>

                  <div className="text-[#4B5563]  text-base">
                    {service.desc}
                  </div>
                </div>

                {/* Points */}
                <ul className="space-y-2">
                  {service.points.map((point, j) => (
                    <li
                      key={j}
                      className="flex items-center text-sm text-[#4B5563] "
                    >
                      <FaCheckCircle className="h-4 w-4 mr-2 flex-shrink-0 text-[#317F21] " />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
