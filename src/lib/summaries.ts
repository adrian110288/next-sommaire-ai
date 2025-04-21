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
    
