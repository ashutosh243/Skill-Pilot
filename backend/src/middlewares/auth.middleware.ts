import config from '../config/config.js';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';



export const authmiddlware = (req: Request, res: Response, next: NextFunction) => {

    try {
        const token = req.cookies.accessToken;
        if (!token) return res.status(StatusCodes.UNAUTHORIZED).send({
            success: false,
            isAuthenticated: false,
            user: null,
            msg: "user not authorized"
        });

        const decode = jwt.verify(token, config.jwtsecret) as JwtPayload;
        if (!decode) return res.status(StatusCodes.UNAUTHORIZED).send({
            success: false,
            isAuthenticated: false,
            user: null,
            msg: "user not authorized"
        });
        res.locals.user = decode;  // new things to learn
        next();

    } catch (e) {
        ;
        return res.status(StatusCodes.UNAUTHORIZED).send({
            success: false,
            isAuthenticated: false,
            user: null,
            msg: "user not authorized"
        });
    }
}


