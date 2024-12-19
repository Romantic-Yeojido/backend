// repositories/user.repository.js
import { pool } from '../db.config.js';

export class UserRepository {
    async findById(userId) {
        try {
            const [rows] = await pool.query(
                'SELECT * FROM users WHERE id = ?',
                [userId]
            );
            return rows[0];
        } catch (error) {
            console.error('사용자 조회 중 오류:', error);
            throw error;
        }
    }

    async softDeleteUser(userId) {
        try {
            const [result] = await pool.query(
                'UPDATE users SET is_deleted = true WHERE id = ?',
                [userId]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('회원 탈퇴 처리 중 오류:', error);
            throw error;
        }
    }
}