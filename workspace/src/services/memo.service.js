import { responseFromMemories } from "../dtos/memo.dto.js";

import { addMemories, getMemories } from "../repositories/memo.repository.js";

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
            max_tokens: 100,
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

