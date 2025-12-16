import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function SuccessPage() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      const session_id = searchParams.get("session_id");
      if (!session_id) return;

      try {
        const res = await fetch(
          `http://localhost:4000/api/stripe/checkout-success?session_id=${session_id}`
        );
        const data = await res.json();

        if (data.success) {
          setOrder(data.order);

          // ✅ CLEAR CART AFTER SUCCESS
          localStorage.removeItem("cart");

          // 🔔 Update navbar/cart badge instantly
          window.dispatchEvent(new Event("storage"));
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [searchParams]);

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!order) return <p className="text-center mt-20 text-red-500">Order not found!</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-[#317F21] mb-4">
        Payment Successful!
      </h1>

      <p className="text-gray-700 mb-6">
        Thank you, {order.user}. Your order has been placed.
      </p>

      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl">
        <h2 className="text-xl font-semibold mb-4">Order Details:</h2>

        {order.products.map((item, idx) => (
          <div key={idx} className="flex justify-between mb-2">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>£{item.price}</span>
          </div>
        ))}

        <div className="flex justify-between mt-4 font-bold text-lg">
          <span>Total:</span>
          <span>£{order.amount}</span>
        </div>
      </div>

      <button
        onClick={() => navigate("/product")}
        className="mt-6 bg-[#317F21] hover:bg-[#3ad81a] text-white px-6 py-3 rounded-xl font-semibold transition"
      >
        Continue Shopping
      </button>
    </div>
  );
}
