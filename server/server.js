

import express from "express";
import "dotenv/config";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { connectDB } from "./lib/db.js";
import userRouter from "./router/Userrouter.js";
import messageRouter from "./router/Messagerouter.js";
import bodyParser from "body-parser";

// Load .env (only locally, Render uses its own env dashboard)
dotenv.config();

// Debug environment
console.log("🔍 Env variables check:", {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI ? "SET" : "MISSING"
});

// Create Express app
const app = express();
const server = http.createServer(app);

// Middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

// Socket.io
export const io = new Server(server, { cors: { origin: "*" } });
export const userSocketMap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Routes
app.get("/api/status", (req, res) => res.send("✅ Server is running"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// Connect DB and start server
await connectDB();

// Use Render’s PORT in production, fallback to 5000 locally
const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0"; // important for Render

server.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
});

export default server;
