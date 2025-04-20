import { SYSTEM_SUMMARY_PROMPT } from "@/utils/prompts";
import OpenAI from "openai";
const client = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY,
});

export const generatePdfSummaryFromOpenAI = async (content: string) => {
    
    try {
    const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: SYSTEM_SUMMARY_PROMPT,
            },
            {
                role: "user",
                content: `Transform this document into an engaging easy-to-read summary with contextually relevant emojis and proper markdown formatting: \n\n${content} `,
            },
        ],
        temperature: 0.7,
        max_tokens: 1500,
    });

    return completion.choices[0].message.content;
    } catch (error) {
        console.error("Error generating summary:", error);
        throw error;
    }
};
