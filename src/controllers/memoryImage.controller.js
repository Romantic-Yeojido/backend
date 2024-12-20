import { StatusCodes } from "http-status-codes";
import { postMemoryImages, getMemoryImagesByMemoryId } from "../services/memoryImage.service.js";

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
        #swagger.responses[200] = {
          description: '이미지 등록 성공',
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  result: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "integer",
                          example: 1
                        },
                        memory_id: {
                          type: "integer",
                          example: 1
                        },
                        image_url: {
                          type: "string",
                          example: "https://romactic-yeojido-s3.s3.ap-northeast-2.amazonaws.com/memory_images/c4fa41df-4b5e-4beb-ab55-b8e2d6e531a2_%C2%BA%C2%AD.jpeg"
                        },
                        image_order: {
                          type: "integer",
                          example: 1
                        },
                        created_at: {
                          type: "string",
                          format: "date-time",
                          example: "2024-12-18T18:24:08.000Z"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        #swagger.responses[400] = {
          description: '이미지 등록 실패',
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
                    type: "string"
                  }
                }
              }
            }
          }
        }
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

export const getMemoryImages = async (req, res, next) => {

  /*
    #swagger.summary = '나만의 보관함 - 사진 불러오기 API';
    #swagger.responses[200] = {
      description: '사진 불러오기 성공',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              result: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "integer",
                      example: 1
                    },
                    memory_id: {
                      type: "integer",
                      example: 1
                    },
                    image_url: {
                      type: "string",
                      example: "https://romactic-yeojido-s3.s3.ap-northeast-2.amazonaws.com/memory_images/6f0cd7a3-d063-4173-9c4a-d3bb4aec2dab_%C2%B0%C2%AD%C2%BE%C3%86%C3%81%C3%B6.jpeg"
                    },
                    image_order: {
                      type: "integer",
                      example: 1
                    },
                    created_at: {
                      type: "string",
                      format: "date-time",
                      example: "2024-12-18T18:24:08.000Z"
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
      description: '사진 불러오기 실패',
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
                type: "string"
              }
            }
          }
        }
      }
    }
*/



  try {
    const { memoryId } = req.params;

    //특정 사용자의 위치에 대한 정보
    const memoryImages = await getMemoryImagesByMemoryId(memoryId);

    console.log(memoryImages);

    res.status(StatusCodes.OK).json({ result: memoryImages });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};
