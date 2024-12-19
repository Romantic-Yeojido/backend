import express from "express";
import { handleMemories , handleUpdateMemory } from "../controllers/memo.controller.js";

const router = express.Router();

router.post("/users/:userId/locations/:locationId", handleMemories);


router.patch("/user/memories/:memoryId", handleUpdateMemory);

export default router;