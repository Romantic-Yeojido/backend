import { pool } from "../db.config.js";

// Content 데이터 삽입
export const addMemories = async (data) => {
    const conn = await pool.getConnection();

  try {
    console.log('Data to be inserted:', data);  // 삽입하려는 데이터 출력

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