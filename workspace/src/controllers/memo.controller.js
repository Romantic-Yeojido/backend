import { StatusCodes } from "http-status-codes";
import { responseFromMemories } from "../dtos/memo.dto.js";
import { postMemories } from "../services/memo.service.js";


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