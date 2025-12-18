import express from "express";
import OrderModel from "../models/orderModel.js";

const orderRouter = express.Router();

orderRouter.get("/", async (req, res) => {
  try {
    const orders = await OrderModel.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


orderRouter.get("/:sessionId", async (req, res) => {
  try {
    const { sessionId } = req.params;
    const order = await OrderModel.findOne({ stripeSessionId: sessionId });

    if (!order) return res.status(404).json({ error: "Order not found" });

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default orderRouter;
