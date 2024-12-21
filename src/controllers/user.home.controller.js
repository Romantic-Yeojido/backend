import {
  getTodayMemory,
  getRandomCompleteMemory,
} from "../services/user.home.service.js";
import { RandomMemoryResponseDTO } from "../dtos/user.home.dto.js";
import { StatusCodes } from "http-status-codes";

export const getTodayMemoryController = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const memory = await getTodayMemory(userId);

    return res.status(200).json({
      success: true,
      data: memory,
    });
  } catch (error) {
    console.error("추억 조회 중 오류 발생:", error);
    return res.status(500).json({
      success: false,
      message: "추억 조회 중 오류가 발생했습니다",
    });
  }
};

export const getRandomMemoryController = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const memory = await getRandomCompleteMemory(userId);

    if (!memory) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "보관함에 추억이 없습니다.",
      });
    }
    const responseData = new RandomMemoryResponseDTO(memory);

    res.status(StatusCodes.OK).json({
      success: true,
      data: responseData,
    });
  } catch (error) {
    console.error("Random memory fetch error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "서버 에러가 발생했습니다",
    });
  }
};
