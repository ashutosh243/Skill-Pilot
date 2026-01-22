import getModel from "../../plan-generator/llm/model.js";
import { question } from "../types.js";
import { z } from 'zod';
import { State } from '../types.js';
import { aiQuestiongenerationPrompt } from "../prompt/prompt.js";

const responseFormat = z.object({
    questionAi: z.array(question)
});

export const generateAiquestion = async (state: State): Promise<Partial<State>> => {

    const model = getModel();
    const structuredModel = model?.withStructuredOutput(responseFormat);
    const { SYSTEM, USER } = aiQuestiongenerationPrompt(state);
    const result = await structuredModel?.invoke([SYSTEM, USER]);
    return { questionAi: result?.questionAi }

}