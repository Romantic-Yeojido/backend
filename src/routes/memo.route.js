import express from "express";
import { handleMemories , handleUpdateMemory ,handleDeleteMemory, handleGetMemory } from "../controllers/memo.controller.js";

const router = express.Router();

//등록
router.post("/users/:userId/locations/:locationId", handleMemories);

router.patch("/user/memories/:memoryId", 
    // #swagger.tags = ['Memories']
    // #swagger.summary = '추억 수정하기'
    // #swagger.description = '사용자의 추억 내용을 수정합니다. visit_date는 수정이 불가능합니다. 수정하고 싶은 필드만 요청에 포함하면 해당 필드만 수정됩니다.'
    /* #swagger.parameters['memoryId'] = {
            in: 'path',
            description: '수정할 추억의 ID',
            required: true,
            type: 'integer',
            example: 1
    } */
    /* #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: 'object',
                        required: ['userId'],
                        properties: {
                            userId: {
                                type: 'integer',
                                description: '사용자 ID (필수)',
                                example: 1
                            },
                            title: {
                                type: 'string',
                                description: '수정할 제목 (선택)',
                                example: '롯데월드에서의 특별한 하루'
                            },
                            content: {
                                type: 'string',
                                description: '수정할 내용 (선택, 수정 시 자동으로 새로운 summary 생성)',
                                example: '오늘은 친구들과 롯데월드에서 즐거운 시간을 보냈다.'
                            },
                            friends: {
                                type: 'string',
                                description: '수정할 친구 목록 (선택)',
                                example: '영희, 철수, 민수'
                            }
                        }
                    }
                }
            }
    } */
    /* #swagger.responses[200] = {
            description: '수정 성공',
            content: {
                "application/json": {
                    example: {
                        success: true,
                        result: {
                            user_id: 1,
                            location_id: 1,
                            title: "롯데월드에서의 특별한 하루",
                            visit_date: "2024-12-21T00:00:00.000Z",
                            friends: "영희, 철수, 민수",
                            content: "오늘은 친구들과 롯데월드에서 즐거운 시간을 보냈다.",
                            summary: "친구들과 롯데월드에서 즐거운 시간을 보냄"
                        }
                    }
                }
            }
    } */
    /* #swagger.responses[500] = {
            description: '서버 에러',
            content: {
                "application/json": {
                    example: {
                        success: false,
                        message: "메모리 수정에 실패했습니다."
                    }
                }
            }
    } */
handleUpdateMemory);

router.patch("/user/memories/delete/:memoryId", 
    // #swagger.tags = ['Memories']
    // #swagger.summary = '추억 삭제하기 (소프트 삭제)'
    // #swagger.description = '추억을 소프트 삭제합니다 (is_deleted 플래그를 true로 설정)'
    /* #swagger.parameters['memoryId'] = {
            in: 'path',
            description: '삭제할 추억의 ID',
            required: true,
            type: 'integer',
            example: 1
    } */
    /* #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: 'object',
                        required: ['userId'],
                        properties: {
                            userId: {
                                type: 'integer',
                                description: '사용자 ID (필수)',
                                example: 1
                            }
                        }
                    }
                }
            }
    } */
    /* #swagger.responses[200] = {
            description: '삭제 성공',
            content: {
                "application/json": {
                    example: {
                        success: true,
                        message: "추억이 삭제되었습니다."
                    }
                }
            }
    } */
    /* #swagger.responses[500] = {
            description: '서버 에러',
            content: {
                "application/json": {
                    example: {
                        success: false,
                        message: "추억 삭제 중 오류가 발생했습니다."
                    }
                }
            }
    } */
handleDeleteMemory);

//불러오기 
router.get("/users/:userId/locations/:locationId/memory-content", handleGetMemory);

export default router;