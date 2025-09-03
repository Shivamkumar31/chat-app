import express from "express";
import "dotenv/config";
import dotenv from 'dotenv';
dotenv.config();
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { connectDB } from "./lib/db.js";
import userRouter from "./router/Userrouter.js";
import messageRouter from "./router/Messagerouter.js";



import bodyParser from "body-parser";




// Verify environment variables are loaded
console.log("Env check:", process.env.MONGO_URI); 

// 1. EXPLICITLY load .env first


// 2. Verify environment loading immediately
console.log("Env variables check:", {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI ? "*****" : "MISSING" // Mask sensitive data
});




// Create Express app and HTTP server
const app = express();

// for hnadel large file uploads

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const server = http.createServer(app);

// Middleware setup
app.use(express.json({ limit: "4mb" }));
app.use(cors());

// Initialize socket.io server
export const io = new Server(server, {
    cors: { origin: "*" }
});

// Store online users
export const userSocketMap = {}; // { userId: socketId }

// Socket.io connection handler
// io.on("connection", (socket) => { 
//     const userId = socket.handshake.query.userId; 
//     console.log("User Connected", userId);

//     if (userId) userSocketMap[userId] = socket.id;

//     // Emit online users to all connected clients
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));

//     socket.on("disconnect", () => { 
//         console.log("User Disconnected", userId); 
//         delete userSocketMap[userId]; 
//         io.emit("getOnlineUsers", Object.keys(userSocketMap));
//     });
// });

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});



 

// Router setup
app.use("/api/status", (req, res) => res.send("Server is and this start of application"));

app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// Connect to MongoDB
await connectDB();
if(process.env.NODE_ENV !== "production"){
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, ()=> console.log("Server is running on PORT: " + PORT));
}

// Export server for Vervel
export default server;
