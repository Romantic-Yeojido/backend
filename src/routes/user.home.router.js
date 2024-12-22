import express from "express";
import {
  getTodayMemoryController,
  getRandomMemoryController,
} from "../controllers/user.home.controller.js";

const router = express.Router();

router.get("/today-memory/:userId", getTodayMemoryController);
router.get("/gift-memory/:userId", getRandomMemoryController);

export default router;
