import { StatusCodes } from "http-status-codes";
import { responseFromMemories } from "../dtos/memo.dto.js";
import { postMemories , updateMemory } from "../services/memo.service.js";


export const handleMemories = async (req, res, next) => {

    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
  
    const memories = await postMemories(responseFromMemories(req.body));
    console.log(memories)
    res.status(StatusCodes.OK).json({ result: memories });
};

export const handleUpdateMemory = async (req, res, next) => {
    try {
        const memoryId = parseInt(req.params.memoryId);
        const userId = parseInt(req.body.userId);  // 사용자 ID
        console.log('Controller received:', { memoryId, userId, body: req.body });  // 로그 추가
        // 수정된 필드만 포함된 데이터 전달
        const updatedMemory = await updateMemory(memoryId,userId, req.body);

           res.status(StatusCodes.OK).json({ 
            success: true,
            result: updatedMemory 
        });
    } catch (error) {
        console.error('Memory update error:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ 
            success: false,
            message: error.message 
        });
    }
};