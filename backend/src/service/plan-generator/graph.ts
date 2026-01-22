import { Command, END, MemorySaver, START, StateGraph } from "@langchain/langgraph";
import { missingSkills } from "./nodes/missingskill.node.js";
import { State } from "./types.js";
import collectData from "./nodes/collectdata.node.js";
import plan from "./nodes/plan.node.js";
import skillDiscovery from "./nodes/skillDiscovery.node.js";
import { confirmDecision } from "./nodes/confimDecision.node.js";
import deletepath from "./nodes/deletepath.node.js";
import savepath from "./nodes/savepath.node.js";



const builder = new StateGraph(State)
    .addNode('collectdata', collectData)
    .addNode('targetskilldiscovery', skillDiscovery)
    .addNode('missingskills', missingSkills)
    .addNode('plan', plan)
    .addNode('confirmDecision', confirmDecision)
    .addNode('savepath', savepath)
    .addNode('deletepath', deletepath);

builder.addEdge(START, 'collectdata')
    .addEdge('collectdata', 'targetskilldiscovery')
    .addEdge('targetskilldiscovery', 'missingskills')
    .addEdge('missingskills', 'plan')
    .addEdge('plan', "confirmDecision")
    .addConditionalEdges('confirmDecision', (s: State) => {
        if (s.decision === 'save') return "savepath"
        else if (s.decision === 'discard') return "deletepath"
        else return "plan"
    })
    .addEdge('savepath', END)
    .addEdge('deletepath', END)

const checkpointer = new MemorySaver();
const graph = builder.compile({
    checkpointer: checkpointer
})
export async function startAgent(state: State){

    try{
        const threadId=`${Date.now()}_${Math.floor(Math.random())*10}`;
        const config = { configurable: { thread_id: threadId} }
        const result = await graph.invoke(state, config);
        return {
            final: result,
            threadId:threadId
        }
    }
    catch (e) {
        const msg = (e instanceof Error) ? e.message : "failed generation";
        console.log('failed at startAgent function ', msg);
        throw e;
    }
}
//I have to implement resume agenet by tommorow export
export async function resumeagent(threadId:string,choice:string){
     
    try{
        const config={configurable:{thread_id:threadId}};
        const result=await graph.invoke(
            new Command({resume:{choice:choice}}),
            config
        );
        return result;
    }
    catch(e)
    {
        const msg=(e instanceof Error)?e.message:"unknow Error";
        console.log(e);
    }
}