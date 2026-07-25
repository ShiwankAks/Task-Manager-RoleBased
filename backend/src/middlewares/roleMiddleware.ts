import type { NextFunction, Request, Response } from "express"
import { CustomJwtPayload } from "../types/express"


const authorizeRole=(...allowedRoles:string[])=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        if (!req.user || !req.user.role) {
            return res.status(401).json({message:"Authentication Required"})
        }
        if (!allowedRoles.includes((req.user as CustomJwtPayload).role)) {
            return res.status(403).json({message:"Unauthorized"})
        }
        next()
    }
}


export default authorizeRole