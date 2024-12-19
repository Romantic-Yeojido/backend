import express from "express";
import { handleMemoryImages } from "../controllers/memoryImage.controller.js";
import { imageUploader } from "../middleware.js";

const router = express.Router();

router.post('/users/memories/:memoryId/images', imageUploader.array('images', 5), handleMemoryImages);

export default router;