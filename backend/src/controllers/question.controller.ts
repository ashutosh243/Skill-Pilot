import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes";
import { startQuestiongeneratoragent } from "../service/Inteview-question-generator/graph.js";
import { State } from '../service/Inteview-question-generator/types.js';

export const generateInterviewquestion = async (req: Request, res: Response) => {
    

    try {
        const state = State.parse(req.body);
        const result = await startQuestiongeneratoragent(state);
        return res.status(StatusCodes.OK).json({ success: true, result: result });
    }
    catch (e) {
        console.log(e);
        const msg = (e instanceof Error) ? e.message : "Error in question generating controller";
        return res.status(StatusCodes.BAD_REQUEST).json({ success: false, msg: msg });
    }
}