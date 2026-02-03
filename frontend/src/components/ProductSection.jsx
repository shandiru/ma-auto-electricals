"use client";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductSellers() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Directly using localhost as requested
  const BASE_URL = "http://localhost:4000";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching from:", `${BASE_URL}/api/products`);
        const res = await fetch(`${BASE_URL}/api/products`);
        const data = await res.json();

        console.log("Full API Response:", data);

        // API array structure handle panrom
        const allProducts = Array.isArray(data) ? data : data.data;

        if (allProducts) {
          // FILTER: isBestSelling true-ah irundha mattum filter pannum
          const filteredSellers = allProducts.filter((item) => {
            console.log(`Product: ${item.name} | isBestSelling:`, item.isBestSelling);
            return item.isBestSelling === true;
          });

          console.log("Filtered Results (Best Sellers Only):", filteredSellers);
          setProducts(filteredSellers);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 font-semibold text-green-600">
        Loading Best Sellers...
      </div>
    );
  }

  // Best seller products illana section-ai hide pannidum
  if (products.length === 0) return null;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        
        {/* Title - Using Green color */}
        <h2 className="text-2xl font-bold mb-8 uppercase tracking-widest text-gray-900 border-l-4 border-green-500 pl-4">
          OUR <span className="text-green-600">BEST SELLERS</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              onClick={() => navigate(`/`)} // Not connecting routes as requested
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 p-5 flex flex-col cursor-pointer transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Green Badge */}
              <div className="mb-3">
                <span className="bg-[#aaee9d] text-[#317F21] text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-tighter">
                  Best Seller
                </span>
              </div>

              {/* Product Image */}
              <div className="flex justify-center items-center mb-5 h-44 overflow-hidden">
                <img
                  src={`${BASE_URL}/images/${product.images[0]}`}
                  alt={product.name}
                  className="h-full w-auto object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Product Info */}
              <div className="mt-auto">
                <h3 className="text-sm font-bold text-gray-800 mb-2 line-clamp-2 h-10 leading-tight">
                  {product.name}
                </h3>
                
                <div className="flex justify-between items-center">
                  {/* Price in Green */}
                  <span className="text-lg font-extrabold text-green-600">
                    £{product.price.toFixed(2)}
                  </span>
                  
                  {/* Icon in Green on Hover */}
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors">
                    <span className="text-xs">→</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}