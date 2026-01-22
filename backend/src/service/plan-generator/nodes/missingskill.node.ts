import { State } from "../types.js";



export async function missingSkills(state: State): Promise<Partial<State>> {

    if (state.status === 'failed') return { ...state };


    const targetSkills = state.targetSkills ?? [];
    const currentSkills = state.currentSkills ?? [];

    const missingSkills = targetSkills?.filter((skill) => !currentSkills.includes(skill));

    return {
        missingSkills: missingSkills,
        status: "missing_skill_generated"
    }


}