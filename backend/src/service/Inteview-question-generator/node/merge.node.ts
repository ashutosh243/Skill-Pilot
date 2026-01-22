import { State } from "../types";

export const merge = async (state: State): Promise<Partial<State>> => {

    const web = state.questionAi.map((q) => {
        return {
            ...q,
            type: "web"
        }
    });
    const ai = state.questionWeb.map((q) => {
        return {
            ...q,
            type: "ai"
        }
    })
    return { allquestion: [...web, ...ai] }


}