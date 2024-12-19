import { StatusCodes } from "http-status-codes";
import { bodyToNewPin } from "../dtos/userMap.dto.js";
import { createNewPin } from "../services/userMap.service.js";
import {
  listUserMemoryLocs,
  ItemLocMemeory,
} from "../services/userMap.service.js";

export const handleListUserMemoryLocs = async (req, res, next) => {
  /*
  #swagger.info = {
    title: 'User Memory Locations API',
    description: '사용자의 메모리 위치 정보를 조회하는 API',
    version: '1.0.0'
  }
*/

  /*
  #swagger.path = '/users/{userId}/memory-locations'
  #swagger.method = 'get'
  #swagger.summary = '사용자의 메모리 위치 목록 조회 API'
  #swagger.description = '특정 사용자의 모든 메모리 위치 정보를 조회합니다.'
  #swagger.parameters['userId'] = {
    in: 'path',
    description: '조회할 사용자의 ID',
    required: true,
    type: 'integer',
    format: 'int64'
  }
  #swagger.responses[200] = {
    description: '메모리 위치 조회 성공',
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true
            },
            result: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  latitude: {
                    type: "number",
                    format: "float",
                    example: 37.5665
                  },
                  longitude: {
                    type: "number",
                    format: "float",
                    example: 126.9780
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  #swagger.responses[404] = {
    description: '조회 실패',
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false
            },
            message: {
              type: "string",
              example: "저장된 장소가 없습니다."
            }
          }
        }
      }
    }
  }
*/
  try {
    const locations = await listUserMemoryLocs(parseInt(req.params.userId));
    res.status(StatusCodes.OK).json({
      success: true,
      result: locations,
    });
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: err.message,
    });
  }
};

export const handleItemLocMemory = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const { latitude, longitude } = req.query;
    const memory = await ItemLocMemeory(userId, latitude, longitude);
    res.status(StatusCodes.OK).json({
      success: true,
      result: memory,
    });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: error.message,
    });
  }
};

export const handleAddNewLoc = async (req, res, next) => {
  try {
    const pinLoc = await createNewPin(bodyToNewPin(req.body));
    res.status(StatusCodes.OK).json({
      success: true,
      result: pinLoc,
    });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: error.message,
    });
  }
};
