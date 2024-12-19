import express from "express";
import { handleMemories , handleUpdateMemory } from "../controllers/memo.controller.js";

const router = express.Router();

router.post("/user/memories", handleMemories);


router.patch("/user/memories/:memoryId", handleUpdateMemory);

export default router;