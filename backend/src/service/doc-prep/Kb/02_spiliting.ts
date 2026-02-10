import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

async function splitPdf(doc: Document[]): Promise<Document[]> {
    const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 200, chunkOverlap: 50 })
    const texts = await splitter.splitDocuments(doc);
    return texts;
}
export default splitPdf;