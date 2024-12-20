// controllers/user.home.controller.js
import { UserHomeService } from '../services/user.home.service.js';
import { RandomMemoryResponseDTO } from '../dtos/user.home.dto.js';  
import { StatusCodes } from 'http-status-codes';  // StatusCodes 임포트 추가

export class UserHomeController {
   constructor() {
       this.userHomeService = new UserHomeService();
       this.getRandomMemory = this.getRandomMemory.bind(this);
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
   
   async  getRandomMemory(req,res)   {
    try {
        const userId = parseInt(req.params.userId);
        const memory = await this.userHomeService.getRandomCompleteMemory(userId);
        
        if (!memory) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "보관함에 추억이 없습니다."
            });
        }
        const responseData = new RandomMemoryResponseDTO(memory);

 
        res.status(StatusCodes.OK).json({
            success: true,
            data: responseData
        });
        
    } catch (error) {
        console.error('Random memory fetch error:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "서버 에러가 발생했습니다"
        });
    }

   }
   
   
   
   
}