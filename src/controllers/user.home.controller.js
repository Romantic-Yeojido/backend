// controllers/user.home.controller.js
import { UserHomeService } from '../services/user.home.service.js';

export class UserHomeController {
   constructor() {
       this.userHomeService = new UserHomeService();
   }

   async getTodayMemory(req, res) {
       try {
           const userId = parseInt(req.params.userId); 

           const memory = await this.userHomeService.getTodayMemory(userId);
           
           return res.status(200).json({
               success: true,
               data: memory  // memory가 없으면 null이 반환됩니다
           });

       } catch (error) {
           console.error('추억 조회 중 오류 발생:', error);
           return res.status(500).json({
               success: false,
               message: "추억 조회 중 오류가 발생했습니다"
           });
       }
   }
}