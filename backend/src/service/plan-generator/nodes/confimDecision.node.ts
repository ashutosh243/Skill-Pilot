import { learningDaySchema, type State } from '../types.js'

export async function confirmDecision(state: State, context: any): Promise<Partial<State>> {

    const path = state?.learningPath
    if (path?.length === 0) {
        return {
            status:'failed'
        }
    }
    const interrupt = context?.interrupt;
    const decision = await interrupt({
        type: "approval_request",
        path
    });
 
    return {
        decision:decision.choice,
    }
}