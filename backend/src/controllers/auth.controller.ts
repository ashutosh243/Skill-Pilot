import User from '../models/user.model.js';
import { registerBody, loginBody } from '../types/types.js';
import { StatusCodes } from 'http-status-codes';
import { Response, Request } from 'express';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';


const register = async (req: Request, res: Response) => {

    try {
        const result = registerBody.parse(req.body);
        const isUser = await User.findOne({ email: result.email });
        if (isUser) return res.status(StatusCodes.BAD_REQUEST).json({ success: true, msg: "user already exists" });
        const hasshedPassword = await bcrypt.hash(result.password, 10);
        const newuser = await User.create({ ...result, password: hasshedPassword });
        return res.status(StatusCodes.OK).json({ success: true, user: newuser });
    }
    catch (e) {
        console.log("error in registration controller", e);
        const msg = e instanceof Error ? "this message" : "Unknown error"
        return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: msg });
    }
}
const login = async (req: Request, res: Response) => {

    try {
        const parsedData = loginBody.parse(req.body);
        const user = await User.findOne({ email: parsedData.email });

        if (!user) return res.status(StatusCodes.NOT_FOUND).json({ success: true, msg: "user not found" });

        const isPassword = await bcrypt.compare(parsedData.password, user.password as string);

        if (!isPassword) return res.status(StatusCodes.UNAUTHORIZED).json({ success: true, msg: "user not authorized" });

        //need to implement jwt here-------------
        const token = generateToken({ id: user._id });
        res.cookie('accessToken', token, { httpOnly: true, sameSite: "lax", maxAge: 7 * 24 * 60 * 60 * 1000 });

        return res.status(StatusCodes.OK).json({ success: true, msg: "user logged in successfully" });
    }
    catch (e) {
        const msg = (e instanceof Error) ? e.message : "unknown Error";
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: msg });
    }

}
const logout = (req: Request, res: Response) => {

    try {
        res.clearCookie('accessToken', { sameSite: "strict", httpOnly: true, secure: true });
        return res.status(StatusCodes.OK).json({ success: true, msg: "User logged out" });
    }
    catch (e) {
        const msg = (e instanceof Error) ? e.message : "Error in logout";
        return res.status(StatusCodes.OK).json({ success: true, msg: msg });
    }

}
const isAuthenticated = (req: Request, res: Response) => {

    try {
        const user = res.locals.user || null;
        if (user) {
            return res.status(StatusCodes.OK).json({
                success: true,
                isAuthenticated: true,
                user
            });
        }

        return res.status(StatusCodes.OK).json({
            success: false,
            isAuthenticated: false,
            user: null,
            msg: "User not authorized"
        });

    } catch (e) {
        const msg = e instanceof Error ? e.message : "Unknown error";
        console.error(msg);
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            isAuthenticated: false,
            user: null,
            msg: "user not authorized"
        });
    }
};

export { login, register, isAuthenticated, logout };


