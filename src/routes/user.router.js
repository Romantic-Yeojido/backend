// routes/user.router.js
import express from "express";
import { UserController } from "../controllers/user.controller.js";
import passport from "passport";
import { naverStrategy } from "../auth.config.js";

const router = express.Router();
const userController = new UserController();
passport.use(naverStrategy);

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
router.patch(
  "/withdraw/:userId",
  userController.withdrawUser.bind(userController)
);

/**
 * @swagger
 * /api/v1/users/{userId}:
 *   get:
 *     summary: 나의 정보 조회
 *     tags: [Users]
 *     description: 사용자의 기본 정보(이메일, 닉네임)를 조회합니다.
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: 조회할 사용자의 ID
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       200:
 *         description: 정보 조회 성공
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
 *                     email:
 *                       type: string
 *                       example: "user123@kakao.com"
 *                     nickname:
 *                       type: string
 *                       example: "철수킴"
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
router.get("/:userId", userController.getMyProfile.bind(userController));

/**
 * @swagger
 * /api/v1/users/auth/logout:
 *   post:
 *     summary: 로그아웃
 *     tags: [Users]
 *     description: 사용자 로그아웃 처리를 수행합니다.
 *     responses:
 *       200:
 *         description: 로그아웃 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "로그아웃이 완료되었습니다"
 */
router.post("/auth/logout", userController.logout.bind(userController));

router.get("/oauth2/login/naver", passport.authenticate("naver"));
router.get(
  "/oauth2/callback/naver",
  passport.authenticate("naver", {
    failureRedirect: "/api/v1/users/oauth2/login/naver",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/")
);

export default router;
