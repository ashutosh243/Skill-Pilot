import { State } from "../types"

export const isEnough = async (state: State): Promise<Partial<State>> => {
    if ((state.websearch as string)?.length < 100) return { decision: false };
    return { decision: true };  
}