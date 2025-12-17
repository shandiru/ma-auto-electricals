import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProductCard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);

        // Extract unique categories
        const uniqueCategories = [...new Set(data.map((p) => p.category))];
        setCategories(uniqueCategories);

        // Set default category to the first one
        if (uniqueCategories.length > 0) {
          setSelectedCategory(uniqueCategories[0]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // Filtered products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <h1 className="text-4xl mt-20 font-bold text-center text-[#317F21] mb-10">
        Products by Category
      </h1>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              selectedCategory === category
                ? "bg-[#317F21] text-white"
                : "bg-gray-200 text-gray-800 hover:bg-[#3ad81a] hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
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
              <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                {product.name}
              </h3>

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
