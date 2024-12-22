import { StatusCodes } from "http-status-codes";
import { bodyToNewPin } from "../dtos/userMap.dto.js";
import { createNewPin } from "../services/userMap.service.js";
import {
  listUserMemoryLocs,
  ItemLocMemeory,
} from "../services/userMap.service.js";

export const handleListUserMemoryLocs = async (req, res, next) => {
  /*
  #swagger.path = '/api/v1/users/{userId}/map'
  #swagger.method = 'get'
  #swagger.summary = '낭만여지도 - 사용자의 모든 메모리 위치 정보 조회 API'
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
              example: "존재하지 않는 사용자입니다."
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
  /*
  #swagger.path = '/api/v1/users/{userId}/map'
  #swagger.method = 'get'
  #swagger.summary = '낭만여지도 - 특정 위치에 대한 추억 요약 팝업 조회 API'
  #swagger.description = '사용자가 지정한 특정 위치가 담고 있는 추억 요약 내용을 조회합니다.'
  #swagger.parameters['userId'] = {
    in: 'path',
    description: '조회할 사용자의 ID',
    required: true,
    type: 'integer',
    format: 'int64'
  }
  #swagger.parameters['latitude'] = {
    in: 'query',
    description: '조회할 위치의 위도',
    type: 'number',
    format: 'float'
  }
  #swagger.parameters['longitude'] = {
    in: 'query',
    description: '조회할 위치의 경도',
    type: 'number',
    format: 'float'
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
                  id: {
                    type: "number",
                    format: "int64",
                    example: 1
                  },
                  title: {
                    type: "string",
                    example: "서울역"
                  },
                  visit_date: {
                    type: "string",
                    example: "2021-07-01"
                  },
                  friends: {
                    type: "string",
                    example: "친구1, 친구2"
                  },
                  gpt_summary: {
                    type: "string",
                    example: "서울역에서 친구들과 만남"
                  },
                  image_url: {
                    type: "string",
                    example: "https://example"
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
    description: '실제 위치에 저장된 메모리가 없는 경우',
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
              example: "해당 위치에 저장된 메모리가 없습니다."
            }
          }
        }
      }
    }
  }
    #swagger.responses[405] = {
    description: '필수 값(유저 아이디, 위도, 경도)이 없는 경우',
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
              example: "필수 파라미터가 누락되었습니다."
            }
          }
        }
      }
    }
  }
*/
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
  /*
  #swagger.path = '/api/v1/users/{userId}/map/new-pin'
  #swagger.method = 'get'
  #swagger.summary = '낭만여지도 - 새로운 핀 저장 API'
  #swagger.description = '추억을 저장할 새로운 위치를 저장합니다.'
  #swagger.parameters['userId'] = {
    in: 'path',
    description: '조회할 사용자의 ID',
    required: true,
    type: 'integer',
    format: 'int64'
  }
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        latitude: {
                            type: "number",
                            format: "float",
                            example: 37.5665,
                            description: "위치의 위도"
                        },
                        longitude: {
                            type: "number",
                            format: "float",
                            example: 126.9780,
                            description: "위치의 경도"
                        }
                    },
                    required: ["latitude", "longitude"]
                }
            }
        }
     }
  #swagger.responses[200] = {
    description: '새로운 위치 정보 저장 성공',
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
    description: '사용자 정보가 존재하지 않는 경우',
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
              example: "존재하지 않는 사용자입니다."
            }
          }
        }
      }
    }
  }
    #swagger.responses[405] = {
    description: '필수 값(위도, 경도)이 없는 경우',
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
              example: "위도와 경도 정보가 필요합니다."
            }
          }
        }
      }
    }
  }
*/
  try {
    const { userId } = req.params;
    const { latitude, longitude } = req.body;
    const pinLoc = await createNewPin(
      bodyToNewPin(userId, latitude, longitude)
    );
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
