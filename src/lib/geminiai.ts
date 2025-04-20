import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_SUMMARY_PROMPT } from "@/utils/prompts";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const generatePdfSummaryFromGemini = async (content: string) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-001", 
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1500
            }
         });
    
    const prompt = {
        contents: [
            {
                role: "user",
                parts: [
                    { text: SYSTEM_SUMMARY_PROMPT },
                    {
                        text: `Transform this document into an engaging easy-to-read summary with contextually relevant emojis and proper markdown formatting: \n\n${content} `,
                    }
                ]
            },
        ],
    };

    const result = await model.generateContent(prompt);
    const summary = result.response;

    if (!summary.text()) {
        throw new Error("Empty response from Gemini");
    }

    return summary.text()
    } catch (error) {
        console.error("Error generating summary with Gemini:", error);
        throw error;
    }
    
}