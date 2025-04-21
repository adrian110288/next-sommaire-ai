import db from "./db";

export async function getSummaries(userId: string) {
    const summaries = await db`SELECT * FROM pdf_summaries WHERE user_id = ${userId}`
        
    return summaries
}
