import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

export default function ProductCard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch products
  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);

        // Extract unique categories
        const uniqueCategories = [...new Set(data.map((p) => p.category))];

        // Format for react-select
        const options = uniqueCategories.map((c) => ({ value: c, label: c }));
        setCategories(options);

        // Default: select only the first category
        if (options.length > 0) setSelectedCategories([options[0]]);
      })
      .catch((err) => console.error(err));
  }, [API_URL]);

  // Filter products based on selected categories
  const filteredProducts =
    selectedCategories.length > 0
      ? products.filter((p) =>
          selectedCategories.some((c) => c.value === p.category)
        )
      : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <h1 className="text-4xl mt-20 font-bold text-center text-[#317F21] mb-10">
        Products by Category
      </h1>

      {/* Multi-select dropdown */}
      <div className="max-w-md mx-auto mb-10">
        <Select
          options={categories}
          value={selectedCategories}
          onChange={(selected) => setSelectedCategories(selected || [])}
          isMulti
          closeMenuOnSelect={false}
          placeholder="Select Categories..."
          className="text-gray-700"
        />
      </div>

      {/* Products grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 overflow-hidden"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={`${API_URL}/images/${product.images[0]}`}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

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

        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">
            No products found in selected categories.
          </p>
        )}
      </div>
    </div>
  );
}
