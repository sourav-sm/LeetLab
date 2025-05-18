import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"; 
import cors from "cors"

import authRoutes from "./routes/auth.routes.js";
import ProblemRoutes from "./routes/problem.routes.js";
import executionRoute from "./routes/execteCode.Route.js";
import bookMarkRoutes from "./routes/bookMark.routes.js";

const app=express();
dotenv.config();
const port=process.env.PORT;

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json());
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("Hello Guys, welcome to LeetLab🔥🔥");
})

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/problems",ProblemRoutes);
app.use("/api/v1/excute-code",executionRoute);
app.use("/api/v1/bookmarks",bookMarkRoutes);


app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})