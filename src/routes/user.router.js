import express from "express";
import {
  handleWithdrawUser,
  handleGetMyProfile,
  handleLogout,
} from "../controllers/user.controller.js";
import passport from "passport";
import { naverStrategy } from "../auth.config.js";

const router = express.Router();
passport.use(naverStrategy);

router.patch("/withdraw/:userId", handleWithdrawUser);
router.get("/:userId", handleGetMyProfile);
router.post("/auth/logout", handleLogout);

router.get("/oauth2/login/naver", passport.authenticate("naver"));
router.get(
  "/oauth2/callback/naver",
  passport.authenticate("naver", {
    failureRedirect: "/api/v1/users/oauth2/login/naver",
    failureMessage: true,
    session: false,
  }),
  (req, res) => {
    const userId = req.user.id;

    res.json({ userId: userId });
  }
);

export default router;
