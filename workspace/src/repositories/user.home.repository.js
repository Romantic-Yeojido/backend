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
}