import express from "express";
import { handleMemories , handleUpdateMemory ,handleDeleteMemory } from "../controllers/memo.controller.js";

const router = express.Router();

router.post("/user/memories", handleMemories);


//수정
router.patch("/user/memories/:memoryId", handleUpdateMemory);

//삭제
router.patch("/user/memories/delete/:memoryId", handleDeleteMemory);
export default router;