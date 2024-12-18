import express from "express";
import {
  handleListUserMemoryLocs,
  handleItemLocMemory,
} from "../controllers/userMap.controller.js";

const router = express.Router();
router.get("/:userId/map", handleListUserMemoryLocs);
router.get("/:userId/map/memory", handleItemLocMemory);

export default router;
