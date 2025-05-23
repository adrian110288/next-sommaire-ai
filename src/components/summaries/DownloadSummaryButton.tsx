"use client";

import React from "react";
import { Button } from "../ui/button";
import { Download } from "lucide-react";

function DownloadSummaryButton({
    title,
    fileName,
    summaryText,
    createdAt,
}: {
    title: string;
    fileName: string;
    summaryText: string;
    createdAt: string;
}) {
    const handleDownload = () => {
        const summaryContent = `# ${title}
Generated Summary
Generated on: ${new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
})}

${summaryText}

Original file: ${fileName}
Generated by Sommaire
`;

        const blob = new Blob([summaryContent], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${title}.md`;
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link); 
        URL.revokeObjectURL(url);
    };

    return (
        <Button
            size="sm"
            className="h-8 px-3 bg-rose-100 text-rose-600 hover:text-rose-700 hover:bg-rose-50"
            onClick={handleDownload}
        >
            <Download className="h-4 w-4 mr-1" /> Download Summary
        </Button>
    );
}

export default DownloadSummaryButton;
