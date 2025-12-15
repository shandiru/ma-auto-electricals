import express from "express";
import Stripe from "stripe";
import "dotenv/config.js";
import OrderModel from "../models/orderModel.js";

const stripeRouter = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 1️⃣ Create Checkout Session
stripeRouter.post("/create-checkout-session", async (req, res) => {
  try {
    const { cart, userDetails } = req.body;
    if (!cart || cart.length === 0) return res.status(400).json({ error: "Cart is empty" });

    // Calculate total price
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Save order in DB with pending status
    const order = new OrderModel({
      user: userDetails,
      products: cart.map((p) => ({
        productId: p._id,
        name: p.name,
        quantity: p.quantity,
        price: p.price,
      })),
      totalPrice,
    });
    await order.save();

    // Create Stripe session with only orderId in metadata
    const line_items = cart.map((item) => ({
      price_data: {
        currency: "gbp",
        product_data: {
          name: item.name,
          description: item.description,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      customer_email: userDetails.email,
      metadata: { orderId: order._id.toString() },
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Stripe checkout failed" });
  }
});

// 2️⃣ Webhook for payment success
stripeRouter.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata.orderId;

    // Update order in DB
    await OrderModel.findByIdAndUpdate(orderId, {
      paymentStatus: "paid",
      stripeSessionId: session.id,
    });
    console.log("Order payment successful:", orderId);
  }

  res.status(200).json({ received: true });
});

export default stripeRouter;
