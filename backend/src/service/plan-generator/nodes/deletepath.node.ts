import type { State } from "../types.js";
import pathModel from "../../../models/path.model.js";

export default async function deletepath(state: State): Promise<Partial<State>> {

    try {
        await pathModel.deleteOne({ userId: state.userId });
        return { status: 'path_discarded and removed data' }
    }
    catch (e) {
        const msg = (e instanceof Error) ? e.message : "Error in  delete path";
        console.log("Error in deletePath", msg);
        return {
            status: "failed"
        }
    }
}