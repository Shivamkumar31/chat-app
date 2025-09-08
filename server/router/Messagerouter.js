import express from "express";
import { protectRoute } from "../middleware/auth.js";
import {
  getMessages,
  getUsersForSidebar,
  markMessageAsSeen,
  sendMessage,
} from "../Controlers/messagecontroler.js";

const messageRouter = express.Router();

// ✅ Get all users for sidebar
messageRouter.get("/users", protectRoute, getUsersForSidebar);

// ✅ Get messages with a specific user (by ID)
messageRouter.get("/:id", protectRoute, getMessages);

// ✅ Mark message as seen
messageRouter.put("/mark/:id", protectRoute, markMessageAsSeen);

// ✅ Send message
messageRouter.post("/send", protectRoute, sendMessage);

export default messageRouter;
