import { pool } from "../db.config.js";

export const findTodayMemory = async (userId) => {
  try {
    const [user] = await pool.query(
      "SELECT id FROM users WHERE id = ? AND is_deleted = false",
      [userId]
    );

    if (!user[0]) {
      const error = new Error("존재하지 않는 사용자입니다");
      error.statusCode = 404;
      throw error;
    }

    const [rows] = await pool.query(
      `SELECT title, visit_date 
            FROM memories 
            WHERE DATE_FORMAT(visit_date, '%m-%d') = DATE_FORMAT(CURRENT_DATE, '%m-%d')
            AND user_id = ?
            AND is_deleted = false
            ORDER BY RAND() 
            LIMIT 1`,
      [userId]
    );

    return rows[0] || null;
  } catch (error) {
    console.error("추억 조회 중 DB 오류:", error);
    throw error;
  }
};

export const fetchRandomMemory = async (userId) => {
  const conn = await pool.getConnection();
  try {
    const [user] = await conn.query(
      "SELECT id FROM users WHERE id = ? AND is_deleted = false",
      [userId]
    );

    if (!user[0]) {
      const error = new Error("존재하지 않는 사용자입니다");
      error.statusCode = 405;
      throw error;
    }

    const [memories] = await pool.query(
      `SELECT 
                m.title,
                m.content,
                m.friends,
                m.visit_date,
                GROUP_CONCAT(mi.image_url) as images
            FROM memories m
            LEFT JOIN memory_images mi ON m.id = mi.memory_id
            WHERE m.user_id = ? 
            AND m.is_deleted = false
            GROUP BY m.id, m.title, m.content, m.friends, m.visit_date
            ORDER BY RAND()
            LIMIT 1`,
      [userId]
    );

    if (!memories || memories.length === 0) {
      return null;
    }

    const memory = memories[0];
    memory.images = memory.images ? memory.images.split(",") : [];

    return memory;
  } catch (error) {
    console.error("Repository error:", error);
    throw error;
  } finally {
    conn.release();
  }
};
