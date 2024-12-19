// import dotenv from "dotenv";
// import OpenAI from "openai";

// dotenv.config();

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY
// });

// const response = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo-0125",
//     messages: [
//         { role: "user", content: "안녕" },
//     ],
//     max_tokens: 100   // 결과 값 최대 길이
// });

// console.log(response.choices[0].message.content.trim());