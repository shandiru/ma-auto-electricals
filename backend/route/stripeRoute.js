import express from "express";
import { createCheckoutSession, checkoutSuccess } from "../controlers/orderController.js";

const stripeRouter = express.Router();

stripeRouter.post("/create-checkout-session", createCheckoutSession);
stripeRouter.get("/checkout-success", checkoutSuccess);

export default stripeRouter;