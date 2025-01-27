import jwt, { VerifyErrors } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'

dotenv.config()


export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(403).json({ message: 'Token not found, access forbidden' }).end()
        return;
    }
    jwt.verify(token, process.env.JWT_SECRET!, (err: VerifyErrors | null, decoded: any) => {
        if (err) {
            res.status(403).end();
            return;
        }
        next();
    });
}