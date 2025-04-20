import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function fetchAndExtractPdfContent(fileUrl: string) {

    const response = await fetch(fileUrl);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const loader = new PDFLoader(new Blob([arrayBuffer]));
    const pages = await loader.load();
    return pages.map((page) => page.pageContent).join("\n");
}  