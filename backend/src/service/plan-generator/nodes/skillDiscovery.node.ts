import { State } from "../types.js";
import getModel from "../llm/model.js";
import { z } from 'zod';
import { skillGenerationprompts } from "../prompts/prompts.js";

const skillbody = z.object({
    targetSkills: z.array(z.string()).default([])
})



export default async function skillDiscovery(state: State): Promise<Partial<State>> {

    try {
        const model = getModel();
        const structured = model?.withStructuredOutput(skillbody);
        const prompts = skillGenerationprompts(state.currentSkills, state.goal, state.level);
        const result = await structured?.invoke([
            { role: 'system', content: prompts.SYSTEM },
            { role: 'user', content: prompts.USER }
        ])
        return {
            targetSkills: result?.targetSkills
        }
    }
    catch (e) {
        const msg = (e instanceof Error) ? e.message : "skill generation failed";
        console.log("Error", msg);
        return {
            status: "failed"
        }
    }
}