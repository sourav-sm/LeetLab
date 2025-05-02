import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"; 

import authRoutes from "./routes/auth.routes.js";

const app=express();
dotenv.config();
const port=process.env.PORT;

app.use(express.json());
app.use(cookieParser);

app.get("/",(req,res)=>{
    res.send("Hello Guys, welcome to LeetLab🔥🔥")
})

app.use("/api/v1/auth",authRoutes);


app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})