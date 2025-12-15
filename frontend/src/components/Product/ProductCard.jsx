import React, { useEffect, useState } from "react";
import { ChevronRight, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProductCard() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <h1 className="text-4xl mt-20 font-bold text-center text-[#317F21] mb-10">
        Featured Products
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 overflow-hidden"
          >
            {/* Image */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={`http://localhost:4000/images/${product.images[0]}`}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                {product.name}
              </h2>

              <p className="text-2xl font-extrabold text-[#317F21] mb-4">
                £{product.price}
              </p>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => navigate(`/products/${product._id}`)}
                  className="flex items-center gap-2 text-[#317F21] font-semibold hover:text-[#3ad81a]"
                >
                  View Details
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
