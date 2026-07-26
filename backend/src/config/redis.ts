import { createClient } from "redis";

export const redis = createClient({
    url: process.env.REDIS_URL
})

redis.on("connect",()=>{
    console.log("Redis Connected")
})

redis.on("error",(err)=>{
    console.log(err)
})