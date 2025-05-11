import express from "express";
import {createProblems, deleteProblemById, getAllProblems, getAllProblemsSolvedByUser, getProblemById, updateProblem} from "../controllers/problem.controller.js";
import { checkAdmin,authMiddleware } from "../middlewares/auth.middleware.js";


const ProblemRoutes=express.Router();

ProblemRoutes.post("/create-problems",authMiddleware,checkAdmin,createProblems);

ProblemRoutes.get("/get-all-problems",authMiddleware,getAllProblems);

ProblemRoutes.get("/get-problems/:id",authMiddleware,getProblemById);

ProblemRoutes.put('/update-problem/:id',authMiddleware,checkAdmin,updateProblem);

ProblemRoutes.delete("/delete-problem/:id",authMiddleware,checkAdmin,deleteProblemById);

ProblemRoutes.get("/get-all-solved-problems",authMiddleware,getAllProblemsSolvedByUser);
    
export default ProblemRoutes;