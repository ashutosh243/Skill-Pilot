import { Request, Response } from "express";
import ingest from "../service/doc-prep/Kb/injest.js";
import query from '../service/doc-prep/generate/query.js';
import { StatusCodes } from "http-status-codes";


export async function ingestPdf(req: Request, res: Response) {

    try {
        const userid = res.locals?.user?.id;
        const filepath = req?.file?.path as string;
        const response = await ingest(filepath, userid);
        if (response === true) {
            return res.status(StatusCodes.OK).send({ success: true, msg: "file ingested successfully" });
        }
        return res.status(StatusCodes.BAD_REQUEST).send({ success: false, msg: "file ingestion unsuccessfull" });
    }
    catch (e) {
        const msg = e instanceof Error ? e.message : "Error in ingestion";
        return res.status(StatusCodes.BAD_REQUEST).send({ success: false, msg: "file not ingested" });
    }
}
export async function retrieve(req: Request, res: Response) {

    try {
        const userId = res.locals.user.id;
        const { text } = req.body;
        const answer = await query(text, userId);
        return res.status(StatusCodes.OK).send({ success: true, msg: answer });
    }
    catch (e) {
        const msg = e instanceof Error ? e.message : "Error in query";
        res.status(StatusCodes.BAD_REQUEST).send({ success: false, msg: msg });

    }
}