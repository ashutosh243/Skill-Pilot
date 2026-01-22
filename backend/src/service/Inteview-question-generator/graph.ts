import { StateGraph, START, END, MemorySaver } from "@langchain/langgraph";
import { State } from "./types.js";
// import type { State } from "./types.js";
import { buildSearchQuery } from "./node/buildSearchquery.node.js";
import { search } from "./node/webSearch.node.js";
import { extractWebquestion } from "./node/extractWebquestion.node.js";
import { generateAiquestion } from "./node/generateAiquestion.node.js";
import { merge } from "./node/merge.node.js";
import { isEnough } from "./node/Enough.node.js";

const builder = new StateGraph(State)
    .addNode('searchquery', buildSearchQuery)
    .addNode('web', search)
    .addNode('webquestionsgeneration', extractWebquestion)
    .addNode('aiquestiongeneration', generateAiquestion)
    .addNode('merge', merge)
    .addNode("IsEnough", isEnough);

builder.addEdge(START, "searchquery")
    .addEdge("searchquery", "web")
    .addEdge("web", "IsEnough")
    .addConditionalEdges("IsEnough", (s: State) => {
        if (s.decision) return "webquestionsgeneration"
        else return "web"
    })
    .addEdge("webquestionsgeneration", "aiquestiongeneration")
    .addEdge("aiquestiongeneration", "merge")
    .addEdge("merge", END);

const checkpointer = new MemorySaver();
const graph = builder.compile({
    checkpointer: checkpointer
});

export async function startQuestiongeneratoragent(state: State) {

    try{
        const threadId = `${Date.now()}_${Math.floor(Math.random()) * 10}`;
        const config = { configurable: { thread_id: threadId } }
        const result = await graph.invoke(state,config);
        return result;
    }
    catch (e) {
        const msg = (e instanceof Error) ? e.message : "Error during invoking graph";
        console.log(msg);
    }
}