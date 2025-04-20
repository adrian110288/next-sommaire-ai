"use server";

import db from "@/lib/db";
import { generatePdfSummaryFromGemini } from "@/lib/geminiai";
import { fetchAndExtractPdfContent } from "@/lib/langchain";
import { generatePdfSummaryFromOpenAI } from "@/lib/openai";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { auth } from "@clerk/nextjs/server";

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

        const formattedFileName = formatFileNameAsTitle(fileName);

        return {
            success: true,
            message: "Summary generated successfully",
            data: {
                title: formattedFileName,
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

interface SavePdfSummaryParams {
    fileUrl: string;
    summaryText: string;
    title: string;
    fileName: string;
}

export const savePdfSummary = async ({
    fileUrl,
    summaryText,
    title,
    fileName,
}: SavePdfSummaryParams) => {
    try {
        const { userId } = await auth();
        if (!userId) {
            return {
                success: false,
                message: "User not found",
            };
        }

        const savedSummary = await db`
            INSERT INTO pdf_summaries (
                user_id,
                original_file_url,
                summary_text,
                title,
                file_name
            ) VALUES (
                ${userId},
                ${fileUrl},
                ${summaryText},
                ${title},
                ${fileName}
            )
        `;

        if (!savedSummary)
            return {
                success: false,
                message: "Failed to save summary",
            };

        return {
            success: true,
            message: "Summary saved successfully",
        };
    } catch (error) {
        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to save summary",
            data: null,
        };
    }
};
