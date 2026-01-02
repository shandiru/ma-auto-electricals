import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./route/userRoute.js";
import carRouter from "./route/carRoute.js";
import productRouter from "./route/productRoute.js";
import stripeRouter from "./route/stripeRoute.js";
import orderRouter from "./route/orderRoute.js";
import "dotenv/config.js";
import http from "http";
import { Server } from "socket.io";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
connectDB();
app.use("/images", express.static("uploads"));

// Attach routes
app.use("/api/user", userRouter);
app.use("/api/cars", carRouter);
app.use("/api/products", productRouter);
app.use("/api/stripe", stripeRouter);
app.use("/api/orders", orderRouter);

// Root endpoint
app.get("/", (req, res) => res.send("API is running"));

// --- HTTP + Socket.io ---
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Make io accessible in controllers
app.set("io", io);

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  socket.on("disconnect", () => console.log("Client disconnected:", socket.id));
});

server.listen(port, () => console.log(`Server running on http://localhost:${port}`));