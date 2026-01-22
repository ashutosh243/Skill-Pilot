import { question, State } from "../types.js";
import getModel from "../../plan-generator/llm/model.js";
import { webQuestiongenerationPrompt } from "../prompt/prompt.js";
import { z } from 'zod';


const responseFormat = z.object({
    questionweb: z.array(question)
});

export const extractWebquestion = async (state: State): Promise<Partial<State>> => {

    const model = getModel();
    const structuredModel = model?.withStructuredOutput(responseFormat);
    const { SYSTEM, USER } = webQuestiongenerationPrompt(state.websearch as string,state);
    const result = await structuredModel?.invoke([SYSTEM, USER]);
    return { questionWeb: result?.questionweb };
}
