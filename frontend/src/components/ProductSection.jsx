"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Active JR",
    oldPrice: 80.0,
    price: 64.0,
    image: "/images/shoe1.png",
  },
  {
    id: 2,
    name: "Bio Original",
    price: 119.0,
    image: "/images/shoe2.png",
  },
  {
    id: 3,
    name: "Bio Perform",
    oldPrice: 119.0,
    price: 99.0,
    image: "/images/shoe3.png",
  },
  {
    id: 4,
    name: "Limited DL",
    price: 129.0,
    image: "/images/shoe4.png",
  },
];

export default function ProductSellers() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          {/* Heading */}
          <h2 className="text-2xl font-bold">OUR BEST SELLERS</h2>

          {/* View All with Lucide Arrow */}
          <a
            href="#"
            className="text-sm font-medium flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
          >
            VIEW ALL
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm p-4 flex flex-col"
            >
              {/* Best Seller Badge */}
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

              {/* Product Name */}
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                {product.name}
              </h3>

              {/* Price */}
              <div className="text-sm text-gray-600">
                {product.oldPrice && (
                  <span className="line-through mr-2">
                    ${product.oldPrice.toFixed(2)}
                  </span>
                )}
                <span className="font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
