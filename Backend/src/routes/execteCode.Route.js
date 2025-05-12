import express from "express"
import { authMiddleware } from "../middlewares/auth.middleware";

const executionRoute=express.Router();

executionRoute.post("/",authMiddleware,executeCode)

export default executionRoute