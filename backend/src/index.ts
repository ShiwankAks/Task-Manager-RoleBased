import express from "express"
import dotenv from "dotenv"
import cors from 'cors'
import connectDb from "./config/mongodb"
import type{ Request,Response } from "express"

dotenv.config()

const port = process.env.PORT || 3000
const app =express()
connectDb()

// Middlewares
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

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)



app.get("/",(req:Request,res:Response)=>{
res.send("hello")
})

app.listen(Number(port),"0.0.0.0",()=>{
    console.log(`Server is running on port ${port}`)
})

