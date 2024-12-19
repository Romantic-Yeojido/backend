// services/user.home.service.js
import { UserHomeRepository } from '../repositories/user.home.repository.js';

export class UserHomeService {
    constructor() {
        this.userHomeRepository = new UserHomeRepository();
    }

    async getTodayMemory(userId) {
        const memory = await this.userHomeRepository.findTodayMemory(userId);
        
        if (!memory) {
            return null;  // 추억이 없으면 null 반환
        }

        // 년도 차이 계산
        const yearsAgo = new Date().getFullYear() - new Date(memory.visit_date).getFullYear();

        return {
            yearsAgo,
            title: memory.title
        };
    }
}