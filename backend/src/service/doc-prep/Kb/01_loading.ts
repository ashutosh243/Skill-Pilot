import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { Document } from "@langchain/core/documents";
import { Doc } from "zod/v4/core";


async function loadPdf(path: string): Promise<Document[]> {

    const loader = new PDFLoader(path);
    const pages: Document[] = await loader.load();
    return pages;

}
export default loadPdf;