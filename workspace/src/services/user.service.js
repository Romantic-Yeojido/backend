// services/user.service.js
import { UserRepository } from '../repositories/user.repository.js';

export class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async withdrawUser(userId) {
        // 사용자 존재 여부 확인
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('존재하지 않는 사용자입니다.');
        }
        // 회원 탈퇴 처리 (is_deleted를 true로 변경)
        const result = await this.userRepository.softDeleteUser(userId);
        if (!result) {
            throw new Error('회원 탈퇴 처리에 실패했습니다.');
        }

        return true;
    }
}