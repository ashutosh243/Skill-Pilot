import { State } from '../types.js';


export default async function collectData(state: State): Promise<Partial<State>> {
      
      if(state.status==='failed')return {}
      return { ...state }
}
