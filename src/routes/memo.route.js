import express from "express";
import { handleMemories , handleUpdateMemory ,handleDeleteMemory, handleGetMemory } from "../controllers/memo.controller.js";

const router = express.Router();

//등록
router.post("/users/:userId/locations/:locationId", handleMemories);

//수정
router.patch("/user/memories/:memoryId", handleUpdateMemory);

//삭제
router.delete("/user/memories/:memoryId", handleDeleteMemory);

//불러오기 
router.get("/users/:userId/locations/:locationId/memory-content", handleGetMemory);

export default router;