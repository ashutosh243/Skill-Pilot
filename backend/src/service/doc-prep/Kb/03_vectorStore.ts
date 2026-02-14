import { CohereEmbeddings } from "@langchain/cohere";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";
import config from "../../../config/config.js";
import type { Document } from "@langchain/core/documents";

const embeddings = new CohereEmbeddings({
    model: "embed-english-v3.0"
});

const pineconeClient = new Pinecone({
    apiKey: config.pine_cone_api_key
});

const index = pineconeClient.index(config.pine_cone_index);

export async function storeDocument(document: Document[], namespace: string): Promise<void> {

    const stats = await index.describeIndexStats();
    const records = stats.namespaces?.[namespace]?.recordCount ?? 0;

    if (records > 0)
        await index.namespace(namespace).deleteAll();

    await PineconeStore.fromDocuments(document, embeddings, { pineconeIndex: index, namespace: namespace })
}
export async function loadVectorStore(namespace: string) {
    return await PineconeStore.fromExistingIndex(
        embeddings,
        {
            pineconeIndex: index,
            namespace: namespace
        }
    )
}
