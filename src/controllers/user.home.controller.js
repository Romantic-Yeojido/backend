import {
  getTodayMemory,
  getRandomCompleteMemory,
} from "../services/user.home.service.js";
import { RandomMemoryResponseDTO } from "../dtos/user.home.dto.js";
import { StatusCodes } from "http-status-codes";

export const getTodayMemoryController = async (req, res) => {
  /*
  #swagger.path = '/api/v1/today-memory/{userId}'
  #swagger.method = 'get'
  #swagger.summary = '오늘의 추억 조회 API'
  #swagger.description = '현재 날짜(월-일)와 동일한 과거의 추억을 무작위로 1개 반환합니다.'
  #swagger.parameters['userId'] = {
    in: 'path',
    description: '조회할 사용자의 ID',
    required: true,
    type: 'integer',
    format: 'int64'
  }
  #swagger.responses[200] = {
    description: '성공적으로 추억을 조회했습니다',
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true
            },
            data: {
              type: "object",
              properties: {
                yearsAgo: {
                  type: "integer",
                  description: "현재로부터 몇 년 전의 추억인지",
                  example: 2
                },
                title: {
                  type: "string",
                  description: "추억의 제목",
                  example: "즐거웠던 여름 휴가"
                }
              }
            }
          }
        }
      }
    }
  }
  #swagger.responses[404] = {
    description: '사용자가 존재하지 않는 경우',
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
              example: "존재하지 않는 사용자입니다"
            }
          }
        }
      }
    }
  }
  #swagger.responses[500] = {
    description: '서버 내부 오류',
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
              example: "추억 조회 중 오류가 발생했습니다"
            }
          }
        }
      }
    }
  }
*/
  try {
    const userId = parseInt(req.params.userId);
    const memory = await getTodayMemory(userId);

    return res.status(200).json({
      success: true,
      data: memory,
    });
  } catch (error) {
    console.error("추억 조회 중 오류 발생:", error);

    if (error.statusCode === 404) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "추억 조회 중 오류가 발생했습니다",
    });
  }
};

export const getRandomMemoryController = async (req, res) => {
  /*
  #swagger.path = '/api/v1/memories/{userId}/random'
  #swagger.method = 'get'
  #swagger.summary = '랜덤 추억 조회 API'
  #swagger.description = '사용자의 추억 중 랜덤으로 하나를 반환합니다.'
  #swagger.parameters['userId'] = {
    in: 'path',
    description: '조회할 사용자의 ID',
    required: true,
    type: 'integer',
    format: 'int64'
  }
  #swagger.responses[200] = {
    description: '랜덤 추억 조회 성공',
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true
            },
            data: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  description: "추억의 제목",
                  example: "즐거웠던 여름 휴가"
                },
                content: {
                  type: "string",
                  description: "추억의 내용",
                  example: "친구들과 함께한 멋진 여행"
                },
                visit_date: {
                  type: "string",
                  format: "date",
                  description: "방문 날짜",
                  example: "2023-08-15"
                },
                friends: {
                  type: "string",
                  description: "함께한 친구들",
                  example: "철수, 영희"
                },
                images: {
                  type: "array",
                  description: "추억 이미지 URL 목록",
                  items: {
                    type: "string"
                  },
                  example: ["http://example.com/image1.jpg", "http://example.com/image2.jpg"]
                }
              }
            }
          }
        }
      }
    }
  }
  #swagger.responses[404] = {
    description: '보관함에 추억이 없는 경우',
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
              example: "보관함에 추억이 없습니다."
            }
          }
        }
      }
    }
  }
  #swagger.responses[405] = {
    description: '사용자가 존재하지 않는 경우',
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
              example: "존재하지 않는 사용자입니다"
            }
          }
        }
      }
    }
  }
  #swagger.responses[500] = {
    description: '서버 내부 오류',
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
              example: "서버 에러가 발생했습니다"
            }
          }
        }
      }
    }
  }
*/
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
    if (error.statusCode === 405) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Random memory fetch error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "서버 에러가 발생했습니다",
    });
  }
};
