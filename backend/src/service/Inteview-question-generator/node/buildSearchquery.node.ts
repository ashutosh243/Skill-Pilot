import type { State } from "../types.js"

export async function buildSearchQuery(state: State):Promise<Partial<State>>{

    const query = `top,latest interview asked question for ${state.technology} for ${state.role} ${state.experience}`
    return {
        searchQuery: query
    }
}