import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyAuthToken = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader?.split(' ')[1] || '';
        jwt.verify(token, process.env.TOKEN_SECRET as string);

        next();
    } catch (error) {
        res.status(401).json(error);
    }
};
