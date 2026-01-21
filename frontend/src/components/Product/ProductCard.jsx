import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { io } from "socket.io-client";

export default function ProductCard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  // 🔹 Fetch products (USED ONLY for stockUpdated)
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  // --- Socket.io setup ---
  useEffect(() => {
    const socket = io(API_URL);

    socket.on("newProduct", (product) => {
      setProducts((prev) => [...prev, product]);
      updateCategories(product);
    });

    socket.on("updateProduct", (product) => {
      setProducts((prev) =>
        prev.map((p) => (p._id === product._id ? product : p))
      );
      updateCategories(product);
    });

    // 🔥 ONLY HERE → API CALL (NO PAGE RELOAD)
    socket.on("stockUpdated", () => {
      fetchProducts();
    });

    socket.on("deleteProduct", (id) => {
      setProducts((prev) => prev.filter((p) => p._id !== id));
    });

    return () => socket.disconnect();
  }, [API_URL]);

  // --- Initial fetch ---
  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);

        const catMap = new Map();
        data.forEach((p) => {
          if (!p.category) return;
          const norm = p.category.trim().toLowerCase();
          if (!catMap.has(norm)) catMap.set(norm, p.category.trim());
        });

        const options = [
          { value: "All", label: "All Categories" },
          ...Array.from(catMap.values()).map((c) => ({
            value: c,
            label: c,
          })),
        ];

        setCategories(options);
        setSelectedCategories([options[0]]);
      })
      .catch(console.error);
  }, [API_URL]);

  // --- Update categories dynamically ---
  const updateCategories = (product) => {
    if (product.category) {
      setCategories((prev) => {
        const exists = prev.some(
          (c) => c.value.toLowerCase() === product.category.toLowerCase()
        );
        if (!exists) {
          return [
            ...prev,
            { value: product.category, label: product.category },
          ];
        }
        return prev;
      });
    }
  };

  // --- Filter products ---
  const filteredProducts =
    selectedCategories.some((c) => c.value === "All")
      ? products
      : products.filter((p) =>
          selectedCategories.some(
            (c) =>
              c.value.trim().toLowerCase() ===
              p.category.trim().toLowerCase()
          )
        );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <h1 className="text-4xl mt-20 font-bold text-center text-[#317F21] mb-2">
        Products by Category
      </h1>

      <p className="text-center text-gray-600 mb-10">
        Total Products: {filteredProducts.length}
      </p>

      <div className="max-w-md mx-auto mb-10">
        <Select
          options={categories}
          value={selectedCategories}
          onChange={(selected) => setSelectedCategories(selected || [])}
          isMulti
          closeMenuOnSelect={false}
          placeholder="Select Categories..."
        />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => {
          const isOutOfStock = product.count === 0;

          return (
            <div
              key={product._id}
              className={`bg-white rounded-2xl overflow-hidden transition
                ${
                  isOutOfStock
                    ? "opacity-70 cursor-not-allowed"
                    : "shadow-lg hover:shadow-2xl hover:-translate-y-2"
                }`}
            >
              <div className="relative h-50 w-60 mx-auto    overflow-hidden">
                <img
                  src={`${API_URL}/images/${product.images?.[0]}`}
                  alt={product.name}
                  className="h-33 w-48 mx-auto mt-10 object-cover"
                />

                {isOutOfStock && (
                  <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    OUT OF STOCK
                  </span>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                <p className="text-2xl font-extrabold text-[#317F21] mb-4">
                  £{Number(product.price).toFixed(2)}
                </p>

                <button
                  disabled={isOutOfStock}
                  onClick={() =>
                    !isOutOfStock &&
                    navigate(`/products/${product._id}`)
                  }
                  className={`flex items-center gap-2 font-semibold
                    ${
                      isOutOfStock
                        ? "text-gray-400"
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
