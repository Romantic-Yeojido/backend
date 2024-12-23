import express from "express";
import { handleMemoryImages, getMemoryImages } from "../controllers/memoryImage.controller.js";
import { imageUploader } from "../middleware.js";

const router = express.Router();

router.post('/users/memories/:memoryId/images', imageUploader.array('images', 5), handleMemoryImages);

router.get('/users/memories/:memoryId/images', getMemoryImages);

export default router;