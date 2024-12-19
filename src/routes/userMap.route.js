import express from "express";
import {
  handleListUserMemoryLocs,
  handleItemLocMemory,
  handleAddNewLoc,
} from "../controllers/userMap.controller.js";

const router = express.Router();
router.get("/:userId/map", handleListUserMemoryLocs);
router.get("/:userId/map/memory", handleItemLocMemory);
router.post("/:userId/map/new-pin", handleAddNewLoc);

export default router;
