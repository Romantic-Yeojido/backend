import { StatusCodes } from "http-status-codes";
import { responseFromMemories , responseFromGetMemories} from "../dtos/memo.dto.js";
import { postMemories, updateMemory, deleteMemory, getMemory } from "../services/memo.service.js";


export const handleMemories = async (req, res, next) => {

  /*
      #swagger.summary = '추억 등록하기 API';
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                title: { type: "string" },
                visit_date: { type: "string", format: "date" },
                friends: { type: "string" },
                content: { type: "string", example: "남자친구와 100일 기념으로 롯데월드에 갔다. 겨울이라 그런지 날씨가 밤이 되니 너무 추웠다. 오늘 날씨가 꽤 추워서 사람들이 많이 없어서 놀이기구를 4개나 탔다. 굉장히 만족스러웠다. 놀이기구 기다리는 동안 남자친구와 대화를 많이 했다. 그 덕에 우리가 전보다 더 가까워진 것 같은 기분이 들어 좋았다. 앞으로도 200일 300일까지 오늘처럼 잘 지냈으면 좋겠다." }
              }
            }
          }
        }
      };
  */


  try {
    const { userId, locationId } = req.params;

    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

    // DTO에 userId와 locationId 추가
    const memoriesData = responseFromMemories({
      ...req.body,
      user_id: userId,
      location_id: locationId,
    });

    const memories = await postMemories(memoriesData);
    console.log(memories);

    res.status(StatusCodes.OK).json({ result: memories });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: error.message,
    });
  }
};

export const handleUpdateMemory = async (req, res, next) => {
  try {
    const memoryId = parseInt(req.params.memoryId);
    const userId = parseInt(req.body.userId);  // 사용자 ID
    console.log('Controller received:', { memoryId, userId, body: req.body });  // 로그 추가
    // 수정된 필드만 포함된 데이터 전달
    const updatedMemory = await updateMemory(memoryId, userId, req.body);

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
export const handleDeleteMemory = async (req, res) => {
  try {
    const memoryId = parseInt(req.params.memoryId);
    const userId = parseInt(req.body.userId);

    await deleteMemory(memoryId, userId);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "추억이 삭제되었습니다."
    });
  } catch (error) {
    console.error('Memory delete error:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        success: false,
        message: error.message
      });
  }
};

export const handleGetMemory = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const locationId = parseInt(req.params.locationId);

    const memory = await getMemory(userId, locationId);
    console.log(memory);

    res.status(StatusCodes.OK).json({ result: memory });
  } catch (error) {
    console.error('Memory get error:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        success: false,
        message: error.message
      });
  }
};
