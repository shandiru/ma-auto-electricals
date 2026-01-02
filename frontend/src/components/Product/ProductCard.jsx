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

        // ===== FIX DUPLICATE CATEGORIES =====
        const categoryMap = new Map();

        data.forEach((p) => {
          if (!p.category) return;
          const normalized = p.category.trim().toLowerCase();
          if (!categoryMap.has(normalized)) {
            categoryMap.set(normalized, p.category.trim());
          }
        });

        const options = Array.from(categoryMap.values()).map((c) => ({
          value: c,
          label: c,
        }));

        setCategories(options);

        if (options.length > 0) {
          setSelectedCategories([options[0]]);
        }
      })
      .catch(console.error);
  }, [API_URL]);

  // Filter products
  const filteredProducts =
    selectedCategories.length > 0
      ? products.filter((p) =>
          selectedCategories.some(
            (c) =>
              c.value.trim().toLowerCase() ===
              p.category.trim().toLowerCase()
          )
        )
      : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <h1 className="text-4xl mt-20 font-bold text-center text-[#317F21] mb-10">
        Products by Category
      </h1>

      {/* CATEGORY MULTI SELECT */}
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

      {/* PRODUCTS GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => {
          const isOutOfStock = product.count === 0;

          return (
            <div
              key={product._id}
              className={`bg-white rounded-2xl overflow-hidden transition transform
                ${
                  isOutOfStock
                    ? "opacity-70 cursor-not-allowed"
                    : "shadow-lg hover:shadow-2xl hover:-translate-y-2"
                }`}
            >
              {/* IMAGE */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={`${API_URL}/images/${product.images?.[0]}`}
                  alt={product.name}
                  className={`w-full h-full object-cover transition duration-500
                    ${!isOutOfStock && "hover:scale-110"}`}
                />

                {/* OUT OF STOCK BADGE */}
                {isOutOfStock && (
                  <span className="absolute top-4 left-4 bg-red-600 text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                    OUT OF STOCK
                  </span>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                  {product.name}
                </h3>

                <p className="text-xl sm:text-2xl font-extrabold text-[#317F21] mb-4">
                  £{product.price}
                </p>

                <button
                  disabled={isOutOfStock}
                  onClick={() =>
                    !isOutOfStock &&
                    navigate(`/products/${product._id}`)
                  }
                  className={`flex items-center gap-2 font-semibold transition
                    ${
                      isOutOfStock
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-[#317F21] hover:text-[#3ad81a]"
                    }`}
                >
                  {isOutOfStock ? "Unavailable" : "View Details"}
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          );
        })}

        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">
            No products found in selected categories.
          </p>
        )}
      </div>
    </div>
  );
}
