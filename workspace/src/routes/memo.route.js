import express from "express";
import { handleMemories } from "../controllers/memo.controller.js";

const router = express.Router();

router.post("/user/memories", handleMemories);

export default router;