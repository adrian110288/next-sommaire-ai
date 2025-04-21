"use server"

import { deleteSummaryFromDb } from "@/lib/summaries";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteSummary({ summaryId }: { summaryId: string }) {
    try {
        const user = await currentUser();
        if (!user?.id) throw new Error("Unauthorized");

        const deletedSummaryIds = await deleteSummaryFromDb(summaryId, user.id);

        if (deletedSummaryIds.length > 0) {
            revalidatePath("/dashboard");
            return { success: true };
        }

        return { success: false };
        
    } catch (error) {
        console.error(error);
        return { success: false };
    }
}