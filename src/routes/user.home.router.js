// routes/user.home.router.js
import express from 'express';
import { UserHomeController } from '../controllers/user.home.controller.js';

const router = express.Router();
const userHomeController = new UserHomeController();

/**
 * @swagger
 * /api/v1/users/home/today-memory/{userId}:
 *   get:
 *     summary: 오늘의 추억 조회
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 조회할 사용자의 ID
 *     responses:
 *       200:
 *         description: 조회 성공 (데이터가 없을 경우 null 반환)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   properties:
 *                     yearsAgo:
 *                       type: integer
 *                       example: 2
 *                     title:
 *                       type: string
 *                       example: "친구들과 롯데월드 방문"
 */
router.get('/today-memory/:userId', userHomeController.getTodayMemory.bind(userHomeController));



router.get('/gift-memory/:userId', userHomeController.getRandomMemory);

export default router;