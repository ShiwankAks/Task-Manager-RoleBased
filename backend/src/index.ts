import express from "express"
import "dotenv/config";
import cors from 'cors'
import connectDb from "./config/mongodb"
import type{ Request,Response } from "express"
import { redis } from "./config/redis"
import helmet from "helmet"


const port = process.env.PORT || 3000
const app =express()
connectDb()
try {
  await redis.connect()
} catch (error) {
  console.error("Redis connection failed , "+error)
}

app.set("trust proxy", 1);

// Middlewares
app.use(helmet())
app.use(express.json())
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);


// Routes
import authRouter from "./routes/authRoute"
import userRouter from "./routes/userRoute"
import rateLimiter from "./middlewares/rateLimiter"

app.use("/api/auth",rateLimiter,authRouter)
app.use("/api/user",userRouter)



app.get("/",(req:Request,res:Response)=>{
res.send("hello")
})

app.listen(Number(port),"0.0.0.0",()=>{
    console.log(`Server is running on port ${port}`)
})

