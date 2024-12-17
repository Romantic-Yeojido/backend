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
    async getMyProfile(req, res) {
        try {
            const userId = parseInt(req.params.userId);
    
            // 사용자 정보 조회
            const userInfo = await this.userService.getMyProfile(userId);
            
            return res.status(200).json({
                success: true,
                data: userInfo
            });
            
        } catch (error) {
            console.error('사용자 정보 조회 중 오류 발생:', error);
            
            if (error.message === '존재하지 않는 사용자입니다') {
                return res.status(404).json({
                    success: false,
                    message: error.message
                });
            }
    
            return res.status(500).json({
                success: false,
                message: "사용자 정보 조회 중 오류가 발생했습니다"
            });
        }
    }

    async logout(req, res) {
        try {
            // 실제 구현에서는 세션 삭제나 토큰 무효화 등의 작업이 필요
            // 테스트를 위해 간단히 성공 응답만 반환
            return res.status(200).json({
                success: true,
                message: "로그아웃이 완료되었습니다"
            });
            
        } catch (error) {
            console.error('로그아웃 중 오류 발생:', error);
            return res.status(500).json({
                success: false,
                message: "로그아웃 처리 중 오류가 발생했습니다"
            });
        }
    }
}