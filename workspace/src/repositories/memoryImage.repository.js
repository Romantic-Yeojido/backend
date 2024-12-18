import { pool } from "../db.config.js";

export const addMemoryImage = async (data) => {
    const conn = await pool.getConnection();

    try {
        const [memory] = await conn.query(`select id from memories where id = ?`, [
            data.memory_id
          ]);
      
          if (memory.length === 0) {
            throw new Error("존재하지 않는 추억입니다.");
          }

        const [result] = await pool.query(
            `INSERT INTO memory_images (memory_id, image_url, image_order) VALUES (?, ?, ?);`,
            [
                data.memory_id,
                data.image_url,
                data.image_order,
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

export const getMemoryImages = async (memoryId) => {
    const conn = await pool.getConnection();

    try {
        const [memoryImages] = await pool.query('SELECT * FROM memory_images WHERE memory_id = ?', memoryId);

        if (memoryImages.length === 0) {
            throw new Error(`Memory image with ID ${memoryId} not found`);
        }

        return memoryImages; // memoryImages 배열 결과 반환
    } catch (error) {
        console.error(error.message);
        throw error;
    } finally {
        conn.release(); // 연결 해제
    }
};

