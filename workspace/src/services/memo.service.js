import { responseFromMemories } from "../dtos/memo.dto.js";

import { addMemories, getMemories , updateMemoryById, getMemoryByUserIdAndId , softDeleteMemory} from "../repositories/memo.repository.js";

import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


// OpenAI API를 사용하여 summary 생성
const generateSummary = async (content) => {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-0125',
            messages: [
                { role: 'user', content: `다음 내용을 아주 짧게 요약해줘: ${content}` },
            ],
            max_tokens: 200,
        });

        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error generating summary:', error);
        throw new Error('Summary 생성에 실패했습니다.');
    }
};


export const postMemories = async (data) => {
    console.log('Received data:', data);  // 데이터를 확인
    try {
        // ChatGPT API를 호출하여 summary 생성
        const summary = await generateSummary(data.content);

        // 생성된 summary를 데이터에 추가
        const memoryData = await addMemories({
            user_id: data.user_id,
            location_id: data.location_id,
            title: data.title,
            visit_date: data.visit_date,
            friends: data.friends,
            content: data.content,
            summary: summary,
        });

        console.log('Memory Data:', memoryData);  // 메모리 데이터 확인
        const memories = await getMemories(memoryData);
        console.log('Memories:', memories);  // 메모리 데이터 확인

        return responseFromMemories(memories);
    } catch (error) {
        console.error('Error in addMemories service:', error);
        throw new Error('메모리 추가에 실패했습니다.');
    }
};
export const updateMemory = async (memoryId, userId, updateData) => {
    try {
        const existingMemory = await getMemoryByUserIdAndId(memoryId, userId);
        console.log('Service received:', { memoryId, userId, updateData });  // 추가

        // content가 변경되었을 때만 새로운 요약 생성
        let summary = existingMemory.summary;
        if (updateData.content) {
            summary = await generateSummary(updateData.content);
            updateData.summary = summary;
        }

        // 데이터 업데이트 수행 
        await updateMemoryById(memoryId, userId, updateData);
        
        // 업데이트된 데이터 조회 및 반환
        const updatedMemory = await getMemoryByUserIdAndId(memoryId,userId);
        return responseFromMemories(updatedMemory);
    } catch (error) {
        console.error('Error in updateMemory service:', error);
        throw new Error('메모리 수정에 실패했습니다.');
    }
};
export const deleteMemory = async (memoryId, userId) => {
    try {
        const result = await softDeleteMemory(memoryId, userId);
        if (!result) {
            throw new Error('삭제할 추억을 찾을 수 없습니다.');
        }
        return true;
    } catch (error) {
        throw error;
    }
};