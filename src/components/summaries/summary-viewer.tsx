
import React from 'react'
import ReactMarkdown from "react-markdown";

function SummaryViewer({ summary }: { summary: string }) {
    return (
        <div>
            <ReactMarkdown>{summary}</ReactMarkdown>
        </div>
    );
}

export default SummaryViewer