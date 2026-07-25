import { JwtPayload } from "jsonwebtoken";

export interface CustomJwtPayload{
    id:string
    role:string
    email?:string
    username?:string
}

declare global {
    namespace Express{
        interface Request{
            user?:CustomJwtPayload
        }
    }
}