import type { State } from "../types.js";
import pathModel from "../../../models/path.model.js";

export default async function savepath(state: State): Promise<Partial<State>> {

    try {
        console.log("state before the update", state);
        const result = await pathModel.findOneAndUpdate(
            {
                userId: state.userId,
                goal: state.goal
            },
            {
                $set: {
                    targetSkills: state.targetSkills,
                    missingSkills: state.missingSkills,
                    learningPath: state.learningPath,
                }
            }
        );
        console.log("result during saving", result);
        return { status: 'path_saved' }
    }
    catch (e) {
        const msg = (e instanceof Error) ? e.message : "Error in saving data";
        console.log("error in savepath node", msg);
        return {
            status: 'failed'
        }
    }


}