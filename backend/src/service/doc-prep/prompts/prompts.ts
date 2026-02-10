import { Document } from "@langchain/core/documents"

export function getSystemPrompt(): string {
  return `
You are a RAG-based assistant.

You will be given:
- Conversation memory (previous user questions and assistant answers)
- Context extracted from a PDF knowledge base
- A user query

Follow these rules strictly:
1. Use the PDF context as the primary source to answer the query.
2. If the answer is not found in the PDF context, you MAY use the conversation memory.
3. If the answer is not found in either the PDF context or the conversation memory, reply exactly: "no answer found".
4. Do NOT use any external knowledge or assumptions.
5. Keep the answer concise and factual.
6. When the user asks about previous questions, answers, or refers to earlier parts of the conversation, answer ONLY using the conversation memory.
`;
}


export function getUserPrompt(query: string, context: Document[]): string {

    const formattedContext = context.map((doc, index) => { return `Context ${index + 1}:\n${doc.pageContent}`; }).join("\n\n");

    return `
        Below is the relevant context retrieved from the PDF knowledge base.
        ${formattedContext}
        User Question:
        ${query}

        Answer using only the above context.
    `;
}
