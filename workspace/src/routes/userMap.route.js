import express from "express";
import { handleListUserMemoryLocs } from "../controllers/userMap.controller.js";

const router = express.Router();

router.get("/:userId/map", handleListUserMemoryLocs);

export default router;
