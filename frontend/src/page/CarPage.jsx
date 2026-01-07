import React from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CarPage() {
  const navigate = useNavigate();

  const cars = [
    {
      name: "Nissan",
      image: "/nissan.jpg",
      route: "/nissan",
    },
    {
      name: "Ford",
      image: "/ford.jpg",
      route: "/ford",
    },
    {
      name: "Vauxhall",
      image: "/vax.jpg",
      route: "/vauxhall",
    },
  ];

  return (
    <div className="min-h-screen bg-white px-6 py-20">
      
      {/* TITLE */}
      <h1 className="text-4xl font-extrabold text-center text-[#35542C] mb-3">
        Choose Your Car
      </h1>

      <p className="text-center text-gray-500 mb-14">
        Select your vehicle brand
      </p>

      {/* GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {cars.map((car) => (
          <div
            key={car.name}
            onClick={() => navigate(car.route)}
            className="
              group cursor-pointer bg-white rounded-2xl
              border border-gray-200
              hover:border-[#35542C]
              shadow-sm hover:shadow-lg
              transition-all duration-300
            "
          >
            {/* IMAGE */}
            <div className="h-56 overflow-hidden rounded-t-2xl">
              <img
                src={car.image}
                alt={car.name}
                className="
                  w-full h-full object-cover
                  transition-transform duration-500
                  group-hover:scale-105
                "
              />
            </div>

            {/* CONTENT */}
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {car.name}
              </h3>

              {/* GREEN ACCENT */}
              <div className="h-1 w-14 bg-[#35542C] rounded-full mb-4"></div>

              <button
                className="
                  flex items-center gap-2
                  text-[#35542C] font-semibold
                  hover:gap-3 transition-all
                "
              >
                View Models
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
