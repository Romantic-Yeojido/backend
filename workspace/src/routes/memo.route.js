import express from "express";
import { handleMemories } from "../controllers/memo.controller.js";

const router = express.Router();

router.post("/users/:userId/locations/:locationId", handleMemories);

export default router;