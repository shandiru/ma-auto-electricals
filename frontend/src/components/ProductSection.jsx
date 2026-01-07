"use client";

import React from "react";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "SPEAKERS JVC CS-J1720X",
    price: 64.0,
    image: "/1.jpg",
  },
  {
    id: 2,
    name: "Road Angel RA-X622BT",
    price: 119.0,
    image: "/2.png",
  },
  {
    id: 3,
    name: "SUBWOOFER Pioneer – TS-WX306B",
    price: 99.0,
    image: "/3.jpg",
  },
  {
    id: 4,
    name: "Halo View Rear Cam",
    price: 129.0,
    image: "/4.png",
  },
];

export default function ProductSellers() {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-2xl font-bold mb-8">OUR BEST SELLERS</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/`)}
              className="bg-white rounded-xl shadow-sm p-4 flex flex-col cursor-pointer
                         hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Badge */}
              <span className="inline-block bg-[#aaee9d] text-[#317F21] text-xs font-medium px-2 py-1 rounded-full mb-2 w-max">
                Best Seller
              </span>

              {/* Image */}
              <div className="flex justify-center items-center mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 w-auto object-contain"
                />
              </div>

              {/* Name */}
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                {product.name}
              </h3>

              {/* Price */}
              <span className="text-sm font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
