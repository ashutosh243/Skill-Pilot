import getModel from "../llm/model.js";
import { loadVectorStore } from "../Kb/03_vectorStore.js";
import { getSystemPrompt, getUserPrompt } from '../prompts/prompts.js';
import { Document } from "@langchain/core/documents";
import { BaseMessage, HumanMessage, AIMessage } from "@langchain/core/messages";
import z from 'zod';


const answerSchem = z.object({
    answer: z.string().min(1)
})
const conversationMemory: BaseMessage[] = [];
export default async function query(text: string, namespace: string) {

    const k = 4;

    try {
        const llm = getModel();
        if (!llm) throw new Error("LLM not initialized");

        const vectorStore = await loadVectorStore(namespace);
        const context: Document[] = await vectorStore.similaritySearch(text, k);

        if (context.length === 0) {
            return { answer: "No answer is found in the PDF." };
        }
        const structuredLlm = llm.withStructuredOutput(answerSchem);
        const response = await structuredLlm?.invoke([
            { role: 'system', content: getSystemPrompt() },
            ...conversationMemory,
            { role: 'user', content: getUserPrompt(text, context) }
        ]);
        conversationMemory.push(
            new HumanMessage(text),
            new AIMessage(JSON.stringify(response))
        )
        if (conversationMemory.length > 10) {
            conversationMemory.slice(0, 2);
        }
        return response;
    }
    catch (e) {
        console.log(e);
        throw e;
    }
}