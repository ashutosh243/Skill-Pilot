import { Request, Response } from "express";
import { pathBody } from "../types/types.js";
import Path from '../models/path.model.js';
import { StatusCodes } from "http-status-codes";
import { startAgent } from '../service/plan-generator/graph.js'
import getInitialState from '../utils/generateInitialState.js'
import { resumeagent } from "../service/plan-generator/graph.js";
import { firstDayNotification } from "../service/email-notification/planNotification.js";


export async function pathDetails(req: Request, res: Response) {

    try {
        const id = res.locals.user.id;
        const data = pathBody.parse(req.body);
        const newpath = await Path.create({
            userId: id,
            ...data
        });
        return res.status(StatusCodes.OK).json({ success: true, path: newpath });
    }
    catch (e) {
        const msg = (e instanceof Error) ? e.message : "unknow Error";
        console.log("Error in pathDetails controller", msg);
        return res.status(StatusCodes.BAD_REQUEST).json({ success: false, msg: msg });
    }
}
export async function pathGenerate(req: Request, res: Response) {

    try {
        const { id } = req.body;
        const pathData = await Path.findById(id);
        const initialState = getInitialState(pathData);
        const result = await startAgent(initialState);
        return res.status(StatusCodes.OK).json({ success: true, result: result.final, threadId: result.threadId }); //will return interrupt always
    }
    catch (e) {
        console.log(e);
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: e })
    }
}
export async function pathDecision(req: Request, res: Response) {

    try {
        const { threadId, choice } = req.body;
        const result = await resumeagent(threadId, choice);
        return res.status(StatusCodes.OK).json({ success: true, result: result });
    }
    catch (e) {
        const msg = (e instanceof Error) ? e.message : "unknown error";
        return res.status(StatusCodes.BAD_REQUEST).json({ success: false, msg: msg });
    }
}
export async function startPath(req: Request, res: Response) {

    try {
        const { id, startDate } = req.body;
        const validStartDate = new Date(startDate);
        const today = new Date();
        const path = await Path.findByIdAndUpdate(
            id,
            { startDate: validStartDate },
            { new: true }
        );
        if (today.toDateString() === validStartDate.toDateString())
            firstDayNotification(path);
        return res.status(StatusCodes.OK).json({ success: true, msg: "path saved" });
    }
    catch (e) {
        const msg = (e instanceof Error) ? e.message : "Unknown Error";
        return res.status(StatusCodes.BAD_REQUEST).json({ success: false, msg: msg });
    }
}
export async function getPath(req: Request, res: Response) {

    try {
        const response = await Path.find({});
        return res.status(StatusCodes.OK).json({ success: true, path: response });
    }
    catch (e) {
        const msg = (e instanceof Error) ? e.message : "error in getpath";
        console.log(msg);
        return res.status(StatusCodes.BAD_REQUEST).json({ success: false, msg })
    }
}
export async function getSinglepath(req: Request, res: Response) {

    try {
        const { id } = req.params;
        const path = await Path.findById(id);

        if (!path) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                msg: "Learning path not found",
            });
        }
        return res.status(StatusCodes.OK).json({ success: true, data: path });
    }
    catch (e) {
        const msg = (e instanceof Error) ? e.message : "Unknow error";
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg });
    }
}
