// routes/user.router.js
import express from 'express';
import { UserController } from '../controllers/user.controller.js';

const router = express.Router();
const userController = new UserController();

/**
 * @swagger
 * /api/v1/users/withdraw/{userId}:
 *   patch:
 *     summary: 회원 탈퇴
 *     tags: [Users]
 *     description: 사용자 계정을 탈퇴. is_deleted 필드를 true로 변경합니다.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *         description: 탈퇴할 사용자의 ID
 *     responses:
 *       200:
 *         description: 회원 탈퇴 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: 탈퇴 처리 성공 여부

 *                   example: true
 *                 message:
 *                   type: string
 *                   description : 결과 메세지지
 *                   example: "회원 탈퇴가 완료되었습니다"
 *       404:
 *         description: 사용자를 찾을 수 없음
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
 *                   example: "존재하지 않는 사용자입니다"
 */
router.patch('/withdraw/:userId', userController.withdrawUser.bind(userController));

export default router;