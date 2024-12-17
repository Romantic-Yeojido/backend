import { pool } from "../db.config.js";

export const getAllUserMemoryLocs = async (userId) => {
  const conn = await pool.getConnection();

  try {
    const [confirm] = await conn.query(`select id from users where id = ?`, [
      userId,
    ]);

    if (confirm.length === 0) {
      return 0;
    }

    const [result] = await conn.query(
      `select u.id, l.latitude, l.longitude
                from users u
                join memories m on u.id = m.user_id
                join locations l on m.location_id = l.id
            where u.id = ?;`,
      [userId]
    );

    return result;
  } catch (err) {
    console.error("DB 에러:", err);
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};
