import { pool } from "../db.config.js";

// Content 데이터 삽입
export const addMemories = async (data) => {
    const conn = await pool.getConnection();

  try {
    const [user] = await conn.query(`select id from users where id = ?`, [
      data.user_id
    ]);

    if (user.length === 0) {
      throw new Error("존재하지 않는 사용자입니다.");
    }

    const [location] = await conn.query(`select id from locations where id = ?`, [
      data.location_id
    ]);

    if (location.length === 0) {
      throw new Error("존재하지 않는 위치입니다.");
    }

    const [result] = await pool.query(
      `INSERT INTO memories (user_id, location_id, title, visit_date, friends, content, summary) VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [
        data.user_id,
        data.location_id,
        data.title,
        data.visit_date,
        data.friends,
        data.content,
        data.summary,
      ]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};


// Memories 테이블 정보 얻기
export const getMemories = async (memoryId) => {
    const conn = await pool.getConnection();

    try {
        const [memory] = await pool.query('SELECT * FROM memories WHERE id = ?', memoryId);

        if (memory.length === 0) {
            throw new Error(`Memory with ID ${memoryId} not found`);
        }

        return memory[0];
    } catch (error) {
        console.error(error.message);
        throw error;
    } finally {
        conn.release();
    }
};