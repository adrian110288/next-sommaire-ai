import db from "./db";

export async function getSummariesFromDb(userId: string) {
    const summaries =
        await db`SELECT * FROM pdf_summaries WHERE user_id = ${userId}`;

    return summaries;
}

export async function deleteSummaryFromDb(summaryId: string, userId: string) {
    const deletedSummary =
        await db`DELETE FROM pdf_summaries WHERE id = ${summaryId} AND user_id = ${userId} RETURNING id;`;
    return deletedSummary;
}

export async function getSummaryFromDb(summaryId: string) {
    try {
        const [summary] = await db`SELECT 
            id,
            user_id,
            title,
            original_file_url,
            summary_text,
            status,
            created_at,
            updated_at,
            file_name,
            LENGTH(summary_text) - LENGTH(REPLACE(summary_text, ' ', '')) + 1  as word_count
            FROM pdf_summaries WHERE id = ${summaryId}`;
        return summary;
    } catch (error) {
        console.error("Error fetching summary:", error);
        return null;
    }
}
    
    
