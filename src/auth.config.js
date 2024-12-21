// auth.config.js
import { pool } from "./db.config.js";
import { Strategy as NaverStrategy } from "passport-naver-v2";

const naverVerify = async (profile) => {
  const conn = await pool.getConnection();

  try {
    const email = profile.email;
    if (!email) {
      throw new Error(`profile.email was not found: ${profile}`);
    }

    const [users] = await conn.query(
      "SELECT id, email FROM users WHERE email = ?",
      [email]
    );

    if (users.length > 0) {
      return {
        id: users[0].id,
        email: email,
        name: profile.name,
      };
    }

    // 새 사용자 생성
    const [result] = await conn.query(
      `INSERT INTO users (id, email, nickname, is_deleted, created_at) 
       VALUES (null, ?, ?, 0, NOW())`,
      [email, profile.name]
    );

    // 생성된 사용자 정보 반환
    return {
      id: result.insertId,
      email: email,
      name: profile.name,
    };
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
};

export const naverStrategy = new NaverStrategy(
  {
    clientID: process.env.PASSPORT_NAVER_CLIENT_ID,
    clientSecret: process.env.PASSPORT_NAVER_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/v1/users/oauth2/callback/naver",
    scope: ["name", "email"],
    state: true,
  },
  (accessToken, refreshToken, profile, cb) => {
    return naverVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }
);
