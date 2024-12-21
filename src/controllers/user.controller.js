import { withdrawUser, getMyProfile } from "../services/user.service.js";

export const handleWithdrawUser = async (req, res, next) => {
  /*
    #swagger.path = '/api/v1/users/withdraw/{userId}'
    #swagger.method = 'patch'
    #swagger.summary = '회원 탈퇴 API'
    #swagger.description = '사용자 계정을 탈퇴. is_deleted 필드를 true로 변경합니다.'
    #swagger.parameters['userId'] = {
      in: 'path',
      description: '탈퇴할 사용자의 ID',
      required: true,
      type: 'integer',
      minimum: 1,
      example: 1
    }
    #swagger.responses[200] = {
      description: '회원 탈퇴 성공',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                description: "탈퇴 처리 성공 여부",
                example: true
              },
              message: {
                type: "string",
                description: "결과 메시지",
                example: "회원 탈퇴가 완료되었습니다."
              }
            }
          }
        }
      }
    }
    #swagger.responses[404] = {
      description: '사용자를 찾을 수 없음',
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
    #swagger.responses[500] = {
      description: '서버 오류',
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
                example: "회원 탈퇴 처리 중 오류가 발생했습니다."
              }
            }
          }
        }
      }
    }
  */
  try {
    const userId = parseInt(req.params.userId);
    const result = await withdrawUser(userId);

    return res.status(200).json({
      success: true,
      message: "회원 탈퇴가 완료되었습니다.",
    });
  } catch (error) {
    if (error.message === "존재하지 않는 사용자입니다.") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    console.error("회원 탈퇴 중 오류 발생:", error);
    return res.status(500).json({
      success: false,
      message: "회원 탈퇴 처리 중 오류가 발생했습니다.",
    });
  }
};

export const handleGetMyProfile = async (req, res, next) => {
  /*
 #swagger.path = '/api/v1/users/{userId}'
 #swagger.method = 'get'
 #swagger.summary = '마이페이지 조회 API'
 #swagger.description = '사용자의 기본 정보(이메일, 닉네임)를 조회합니다.'
 #swagger.parameters['userId'] = {
   in: 'path',
   description: '조회할 사용자의 ID',
   required: true,
   type: 'integer',
   minimum: 1,
   example: 1
 }
 #swagger.responses[200] = {
   description: '정보 조회 성공',
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
               email: {
                 type: "string",
                 example: "user123@kakao.com"
               },
               nickname: {
                 type: "string",
                 example: "철수킴"
               }
             }
           }
         }
       }
     }
   }
 }
 #swagger.responses[404] = {
   description: '사용자를 찾을 수 없음',
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
*/
  try {
    const userId = parseInt(req.params.userId);
    const userInfo = await getMyProfile(userId);

    return res.status(200).json({
      success: true,
      data: userInfo,
    });
  } catch (error) {
    console.error("사용자 정보 조회 중 오류 발생:", error);

    if (error.message === "존재하지 않는 사용자입니다") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "사용자 정보 조회 중 오류가 발생했습니다",
    });
  }
};

export const handleLogout = async (req, res, next) => {
  /*
 #swagger.path = '/api/v1/users/auth/logout'
 #swagger.method = 'post'
 #swagger.summary = '로그아웃 API'
 #swagger.description = '사용자 로그아웃 처리를 수행합니다.'
 #swagger.responses[200] = {
   description: '로그아웃 성공',
   content: {
     "application/json": {
       schema: {
         type: "object",
         properties: {
           success: {
             type: "boolean",
             example: true
           },
           message: {
             type: "string",
             example: "로그아웃이 완료되었습니다"
           }
         }
       }
     }
   }
 }
*/
  try {
    return res.status(200).json({
      success: true,
      message: "로그아웃이 완료되었습니다",
    });
  } catch (error) {
    console.error("로그아웃 중 오류 발생:", error);
    return res.status(500).json({
      success: false,
      message: "로그아웃 처리 중 오류가 발생했습니다",
    });
  }
};
