import { Document } from "@langchain/core/documents";
import loadPdf from "./01_loading.js";
import splitPdf from "./02_spiliting.js";
import { storeDocument, } from "./03_vectorStore.js";

export default async function ingest(path:string,namespace:string):Promise<boolean>{
  
    try{
         const docs:Document[]=await loadPdf(path);
         const splittedDocs=await splitPdf(docs);
         const store=await storeDocument(splittedDocs,namespace);
         return true;
    }
    catch(e)
    {
        console.log("Error in injest",e);
        return false;
    }
}