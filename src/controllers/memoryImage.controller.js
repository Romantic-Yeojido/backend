import { StatusCodes } from "http-status-codes";
import { postMemoryImages } from "../services/memoryImage.service.js";

export const handleMemoryImages = async (req, res, next) => {

    /*
          #swagger.summary = '이미지 등록하기 API';
          #swagger.requestBody = {
            required: true,
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    images: {
                        type: "array",
                        items: {
                            type: "string",
                            format: "binary",
                            description: "이미지 파일 업로드"
                        },
                        description: "최대 5개의 이미지 파일 업로드 가능",
                        maxItems: 5
                    }
                  }
                }
              }
            }
          };
      */


    try {
        console.log("Files uploaded:", req.files); // multer로 처리된 이미지 파일들 확인

        const { memoryId } = req.params;

        // 서비스 함수 호출
        const memories = await postMemoryImages(req.files, memoryId);

        console.log(memories);

        res.status(StatusCodes.OK).json({ result: memories });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: error.message,
        });
    }
};