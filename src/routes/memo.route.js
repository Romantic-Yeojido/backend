import express from "express";
import { handleMemories , handleUpdateMemory ,handleDeleteMemory } from "../controllers/memo.controller.js";

const router = express.Router();

router.post("/users/:userId/locations/:locationId", handleMemories);


//수정
router.patch("/user/memories/:memoryId", handleUpdateMemory);

//삭제
router.delete("/user/memories/:memoryId", handleDeleteMemory);
export default router;