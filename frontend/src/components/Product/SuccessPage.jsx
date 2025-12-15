import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Success() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get("session_id");
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!sessionId) return;

    const fetchOrder = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/orders/${sessionId}`);
        if (!res.ok) throw new Error("Order not found");
        const data = await res.json();
        setOrder(data);
        localStorage.removeItem("cart");
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrder();
  }, [sessionId]);

  if (!order) return <p className="text-center mt-20">Loading order details...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
      <p className="text-gray-700 text-center mb-6">Thank you for your purchase. Your order has been received.</p>

      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-2">Customer Details:</h2>
        <p><strong>Name:</strong> {order.user.name}</p>
        <p><strong>Email:</strong> {order.user.email}</p>
        <p><strong>Phone:</strong> {order.user.phone}</p>
        <p><strong>Address:</strong> {order.user.address}</p>

        <h2 className="text-xl font-semibold mt-4 mb-2">Order Details:</h2>
        <ul className="divide-y divide-gray-200">
          {order.products.map((item, idx) => (
            <li key={idx} className="py-2">
              {item.name} x {item.quantity} - £{item.price.toFixed(2)}
            </li>
          ))}
        </ul>

        <p className="mt-4 text-lg font-bold">Total: £{order.totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
}
