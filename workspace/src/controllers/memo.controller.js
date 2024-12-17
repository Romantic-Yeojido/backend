import { StatusCodes } from "http-status-codes";
import { responseFromMemories } from "../dtos/memo.dto.js";
import { postMemories } from "../services/memo.service.js";


export const handleMemories = async (req, res, next) => {

    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
  
    const memories = await postMemories(responseFromMemories(req.body));
    console.log(memories)
    res.status(StatusCodes.OK).json({ result: memories });
};