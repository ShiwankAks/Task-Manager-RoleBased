import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { CustomJwtPayload } from '../types/express'

const verifyToken = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ","")
        if (!token) {
            return res.status(401).json({message:"Unauthorized access"})
        }
        const decodedToken =jwt.verify(token,process.env.JWT_SECRET!) as CustomJwtPayload;
        req.user = decodedToken
        next()
    } catch (error) {
        return res.status(401).json({message:"Invalid token"})
    }
}

export default verifyToken