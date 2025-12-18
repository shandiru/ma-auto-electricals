import Stripe from "stripe";
import orderModel from "../models/orderModel.js";
import { v4 as uuidv4 } from "uuid";
import { sendEmail } from "../utils/sendEmail.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * CREATE STRIPE CHECKOUT SESSION
 */
export const createCheckoutSession = async (req, res) => {
  const { cart, userDetails } = req.body;

  try {
    if (!cart || cart.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const name = userDetails.name || "Guest";
    const email = userDetails.email || "noemail@example.com";
    const phone = userDetails.phone || "";
    const address = userDetails.address || "";

    const line_items = cart.map((item) => ({
      price_data: {
        currency: "gbp",
        product_data: {
          name: item.name,
          description: item.description?.substring(0, 200),
        },
        unit_amount: Math.round(Number(item.price) * 100),
      },
      quantity: item.quantity,
    }));

    const compactCart = cart.map((item) => ({
      _id: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      customer_email: email,
      success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/cart`,
      metadata: {
        user: name,
        email,
        phone,
        address,
        cart: JSON.stringify(compactCart),
      },
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    res.status(500).json({ error: "Stripe checkout failed" });
  }
};

/**
 * CHECKOUT SUCCESS
 */
export const checkoutSuccess = async (req, res) => {
  const { session_id } = req.query;

  try {
    if (!session_id)
      return res.status(400).json({ error: "No session_id provided" });

    const session = await stripe.checkout.sessions.retrieve(session_id);
    const metadata = session.metadata || {};
    const products = JSON.parse(metadata.cart || "[]");

    // 🔹 Prevent duplicate save using stripeSessionId
    const existingOrder = await orderModel.findOne({
      stripeSessionId: session.id,
    });

    if (existingOrder) {
      return res.json({
        success: true,
        message: "Order already processed",
        order: existingOrder,
      });
    }

    const order = new orderModel({
      orderId: uuidv4(),
      stripeSessionId: session.id,
      user: metadata.user || "Guest",
      email: metadata.email || session.customer_email || "noemail@example.com",
      phone: metadata.phone || "",
      address: metadata.address || "",
      products,
      amount: session.amount_total / 100,
      payment_status: session.payment_status,
    });

    await order.save();

    // Send email to admin
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminSubject = `New Order Received - ${order.orderId}`;
    const adminHtml = `
      <h2>New Order Received</h2>
      <p><strong>Order ID:</strong> ${order.orderId}</p>
      <p><strong>Customer Name:</strong> ${order.user}</p>
      <p><strong>Email:</strong> ${order.email}</p>
      <p><strong>Phone:</strong> ${order.phone}</p>
      <p><strong>Address:</strong> ${order.address}</p>
      <h3>Products:</h3>
      <ul>
        ${products.map(p => `<li>${p.name} × ${p.quantity} - £${p.price}</li>`).join("")}
      </ul>
      <p><strong>Total Amount:</strong> £${order.amount}</p>
      <p><strong>Payment Status:</strong> ${order.payment_status}</p>
    `;
    await sendEmail({ to: adminEmail, subject: adminSubject, html: adminHtml });

    // Send email to user
    const userSubject = `Your Order Confirmation - ${order.orderId}`;
    const userHtml = `
      <h2>Thank you for your order, ${order.user}!</h2>
      <p><strong>Order ID:</strong> ${order.orderId}</p>
      <h3>Order Details:</h3>
      <ul>
        ${products.map(p => `<li>${p.name} × ${p.quantity} - £${p.price}</li>`).join("")}
      </ul>
      <p><strong>Total Amount:</strong> £${order.amount}</p>
      <p>Your order will be processed and shipped to:</p>
      <p>${order.address}</p>
    `;
    await sendEmail({ to: order.email, subject: userSubject, html: userHtml });

    res.json({ success: true, order });
  } catch (err) {
    console.error("Order Save Error:", err);
    res.status(500).json({ error: "Failed to save order" });
  }
};