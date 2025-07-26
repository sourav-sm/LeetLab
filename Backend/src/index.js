import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"; 
import cors from "cors"

import authRoutes from "./routes/auth.routes.js";
import ProblemRoutes from "./routes/problem.routes.js";
import executionRoute from "./routes/execteCode.Route.js";
import bookMarkRoutes from "./routes/bookMark.routes.js";
import submissionRoutes from "./routes/submission.routes.js"

const app=express();
dotenv.config();
const port=process.env.PORT;

const corsOptions={
    origin:["http://localhost:5173","https://www.algopundit.com"],
    credentials:true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("Hello Guys, welcome to AlgoPundit🔥🔥");
})

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/problems",ProblemRoutes);
app.use("/api/v1/execute-code",executionRoute);
app.use("/api/v1/bookmark",bookMarkRoutes);
app.use("/api/v1/submission",submissionRoutes);

app.get("/health", (req, res) => {
  res.status(200).send("Server is healthy 💪");
});


app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})
