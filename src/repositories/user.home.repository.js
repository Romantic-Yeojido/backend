// repositories/user.home.repository.js
import { pool } from '../db.config.js';

export class UserHomeRepository {
    async findTodayMemory(userId) {
        try {
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
            
            return rows[0] || null;  // 결과가 없으면 null 반환
        } catch (error) {
            console.error('추억 조회 중 DB 오류:', error);
            throw error;
        }
    }
     async fetchRandomMemory(userId) {
        const conn = await pool.getConnection();
        try {
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
            // 콤마 구분된 이미지 URL 문자열을 배열로 
            memory.images = memory.images ? memory.images.split(',') : [];
 
            return memory;
        } catch (error) {
            console.error('Repository error:', error);
            throw error;
        } finally {
            conn.release();
        }
    }
}
