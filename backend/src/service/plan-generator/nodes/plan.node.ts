import getModel from "../llm/model.js";
import { planGenerationPrompts } from "../prompts/prompts.js";
import { State } from "../types.js";
import { learningDaySchema } from "../types.js";
import { z } from 'zod';

const ouputschem = z.object({
    path: z.array(learningDaySchema)
})
export default async function plan(state: State): Promise<Partial<State>> {

    try {
        const model = getModel();
        const structured = model?.withStructuredOutput(ouputschem);
        const prompt = planGenerationPrompts((state.targetSkills as string[]), state.currentSkills, state.goal, state.level, state.timePerDay);
        const result = await structured?.invoke([
            { role: 'system', content: prompt.SYSTEM },
            { role: 'user', content: prompt.USER }
        ]);
        return {
            learningPath: result?.path.map(step => ({
                day: step.day,
                heading: step.heading,
                explanation: step.explanation,
                completed: step.completed ?? false,
                reminderSent: step.reminderSent ?? [],
            })),
            status:'path_generated'
        };
    }
    catch (e) {
        const msg = (e instanceof Error) ? e.message : "failed";
        console.log("path generation failed", msg);
        return { learningPath: [], status: 'failed' }
    }
}