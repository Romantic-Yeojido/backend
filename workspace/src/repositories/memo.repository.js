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

export const getMemoryByUserIdAndId = async (memoryId, userId) => {
  const conn = await pool.getConnection();
  try {

    console.log('Repository received:', { memoryId, userId }); // 파라미터 확인

    const query = 'SELECT * FROM memories WHERE id = ? AND user_id = ? AND is_deleted = false';
    console.log('Query:', query); // 실제 실행되는 쿼리
    console.log('Query params:', [memoryId, userId]); // 쿼리 파라미터

    const [memory] = await pool.query(query, [memoryId, userId]);

    console.log('Query result:', memory); // 쿼리 결과


    if (memory.length === 0) {
      throw new Error(`해당 추억을 찾을 수 없습니다.`);
    }

    return memory[0];
  } catch (error) {
    console.error(error.message);
    throw error;
  } finally {
    conn.release();
  }
};

// repositories/memo.repository.js
export const updateMemoryById = async (memoryId, userId, data) => {
  const conn = await pool.getConnection();
  try {
    const updateFields = [];
    const values = [];

    if (data.title !== undefined) {
      updateFields.push('title = ?');
      values.push(data.title);
    }
    if (data.content !== undefined) {
      updateFields.push('content = ?');
      values.push(data.content);
    }
    if (data.summary !== undefined) {
      updateFields.push('summary = ?');
      values.push(data.summary);
    }
    if (data.friends !== undefined) {
      updateFields.push('friends = ?');
      values.push(data.friends);
    }

    updateFields.push('updated_at = CURRENT_TIMESTAMP');

    const updateQuery = `
        UPDATE memories 
        SET ${updateFields.join(', ')}
        WHERE id = ? AND user_id = ? AND is_deleted = false
    `;

    values.push(memoryId, userId);

    const [result] = await pool.query(updateQuery, values);
    return memoryId;
  } catch (err) {
    throw new Error('메모리 수정 중 오류가 발생했습니다.');
  } finally {
    conn.release();
  }
};