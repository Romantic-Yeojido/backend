// controllers/user.controller.js
import { UserService } from '../services/user.service.js';

export class UserController {
    constructor() {
        this.userService = new UserService();
    }

    async withdrawUser(req, res) {
        try {
            const userId = parseInt(req.params.userId);
            
            const result = await this.userService.withdrawUser(userId);
            
            return res.status(200).json({
                success: true,
                message: "회원 탈퇴가 완료되었습니다."
            });
            
        } catch (error) {
            if (error.message === '존재하지 않는 사용자입니다.') {
                return res.status(404).json({
                    success: false,
                    message: error.message
                });
            }

            console.error('회원 탈퇴 중 오류 발생:', error);
            return res.status(500).json({
                success: false,
                message: "회원 탈퇴 처리 중 오류가 발생했습니다."
            });
        }
    }
}