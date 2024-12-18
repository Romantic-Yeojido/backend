import { StatusCodes } from "http-status-codes";
import { postMemoryImages } from "../services/memoryImage.service.js";

export const handleMemoryImages = async (req, res, next) => {
    console.log("Files uploaded:", req.files); // multer로 처리된 이미지 파일들 확인
    
    // S3에 업로드된 이미지 URL을 DB에 저장
    const memoryId = req.body.memory_id; // memoryId는 body에서 가져옴
    const memories = await postMemoryImages(req.files, memoryId);

    console.log(memories); // DB에 저장된 결과 확인

    res.status(StatusCodes.OK).json({ result: memories });
};
