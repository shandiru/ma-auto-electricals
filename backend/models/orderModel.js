import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
  },
  products: [
    {
      productId: { type: String },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  paymentStatus: { type: String, default: "pending" },
  stripeSessionId: { type: String },
}, { timestamps: true });

const OrderModel = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default OrderModel;
