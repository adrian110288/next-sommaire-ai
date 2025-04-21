import SummaryCard from "@/components/summaries/summary-card";
import SummaryUploadReachedNotice from "@/components/summaries/summary-upload-reached-notice";
import { Button } from "@/components/ui/button";
import { getSummaries } from "@/lib/summaries";
import { auth, currentUser } from "@clerk/nextjs/server";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

async function DashboardPage() {
    const user = await currentUser();
    if (!user?.id) return redirect("/sign-in");
    const summaries = await getSummaries(user.id);
    const uploadLimit = 5;

    return (
        <main className="min-h-screen">
            <div className="container mx-auto flex flex-col gap-4">
                <div className="px-2 py-12 sm:py-24">
                    <div className="flex gap-4 mb-8 justify-between">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-4xl font-bold tracking-tight">
                                Your Summaries
                            </h1>
                            <p className="text-muted-foreground">
                                View and manage your generated summaries.
                            </p>
                        </div>
                        <Button
                            variant="link"
                            className="bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 hover:scale-101 transition-all duration-300 group hover:no-underline"
                        >
                            <Link
                                href="/upload"
                                className="flex items-center text-white"
                            >
                                <Plus className="mr-2 h-5 w-5" />
                                New Summary
                            </Link>
                        </Button>
                    </div>
                    <div className="mb-6">
                        <SummaryUploadReachedNotice uploadLimit={uploadLimit} />
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
                        {summaries.map((summary) => (
                            <SummaryCard key={summary.id} summary={summary} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default DashboardPage;
