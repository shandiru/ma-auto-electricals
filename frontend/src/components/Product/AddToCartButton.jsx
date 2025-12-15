import React from "react";
import { ShoppingCart } from "lucide-react";

export default function AddToCartButton({ product }) {
  const handleAddToCart = () => {
    // Get existing cart or empty array
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if product already exists in cart
    const existingItem = cart.find((item) => item._id === product._id);
    if (existingItem) {
      existingItem.quantity += 1; // increment quantity
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    // Save back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="mt-8 flex items-center justify-center gap-3 bg-[#317F21] hover:bg-[#3ad81a] text-white text-lg font-semibold py-4 rounded-xl transition"
    >
      <ShoppingCart />
      Add to Cart
    </button>
  );
}
