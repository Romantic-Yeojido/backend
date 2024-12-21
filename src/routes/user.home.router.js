import express from "express";
import {
  getTodayMemoryController,
  getRandomMemoryController,
} from "../controllers/user.home.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/users/home/today-memory/{userId}:
 *   get:
 *     tags:
 *       - Users
 *     summary: 오늘의 추억 조회
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: 조회할 사용자의 ID
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: 조회 성공 (데이터가 없을 경우 null 반환)
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             data:
 *               type: object
 *               nullable: true
 *               properties:
 *                 yearsAgo:
 *                   type: integer
 *                   example: 2
 *                 title:
 *                   type: string
 *                   example: '친구들과 롯데월드 방문'
 */
router.get("/today-memory/:userId", getTodayMemoryController);

/**
 * @swagger
 * /api/v1/users/home/gift-memory/{userId}:
 *   get:
 *     tags:
 *       - Users
 *     summary: 랜덤 추억 선물하기
 *     description: 사용자의 추억 중 하나를 랜덤으로 선택하여 반환합니다.
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: 조회할 사용자의 ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 조회 성공
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
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: '친구들과 놀이공원 방문'
 *                     content:
 *                       type: string
 *                       example: '오늘은 친구들과 함께 놀이공원에 다녀왔다...'
 *                     visit_date:
 *                       type: string
 *                       format: date
 *                       example: '2023-12-21'
 *                     friends:
 *                       type: string
 *                       example: '영희, 철수'
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: 'https://example.com/image1.jpg'
 *       404:
 *         description: 추억을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: '보관함에 추억이 없습니다.'
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: '서버 에러가 발생했습니다'
 */
router.get("/gift-memory/:userId", getRandomMemoryController);

export default router;
