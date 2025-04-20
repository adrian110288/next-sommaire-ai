"use server";

import { generatePdfSummaryFromGemini } from "@/lib/geminiai";
import { fetchAndExtractPdfContent } from "@/lib/langchain";
import { generatePdfSummaryFromOpenAI } from "@/lib/openai";

export const generatePdfSummary = async (
    uploadedFile: [
        {
            name: string;
            serverData: {
                userId: string;
                file: string;
            };
        }
    ]
) => {
    if (!uploadedFile)
        return {
            success: false,
            message: "No file uploaded",
            data: null,
        };

    const {
        name: fileName,
        serverData: { userId, file: pdfUrl },
    } = uploadedFile[0];

    if (!pdfUrl)
        return {
            success: false,
            message: "No file uploaded",
            data: null,
        };

    try {
        const content = await fetchAndExtractPdfContent(pdfUrl);

        let summary;
        try {
            summary = await generatePdfSummaryFromOpenAI(content);
            console.log({ summary });
        } catch (error) {
            console.error("Error generating summary with OpenAI:", error);

            try {
                summary = await generatePdfSummaryFromGemini(content);
                console.log({ summary });
            } catch (geminiError) {
                console.log("Error generating summary with Gemini");
                throw new Error(
                    "Failed to generate summary with evailable AI providers"
                );
            }
        }

        if (!summary)
            return {
                success: false,
                message: "Failed to generate summary",
                data: null,
            };

        return {
            success: true,
            message: "Summary generated successfully",
            data: {
                summary,
            },
        };
    } catch (error) {
        return {
            success: false,
            message: "Failed to generate summary",
            data: null,
        };
    }
};
