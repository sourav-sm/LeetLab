import express from "express"
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { addProblemToBookMark, createBookMark, deleteBookMark, getAllBookmarks, getBookMarks, removeProblemFromBookMark } from "../controllers/bookMark.controller.js";

const bookMarkRoutes=express.Router();


bookMarkRoutes.get("/",authMiddleware,getAllBookmarks);

bookMarkRoutes.get("/:bookMarkId",authMiddleware,getBookMarks);

bookMarkRoutes.post("/create-bookmark",authMiddleware,createBookMark);

bookMarkRoutes.post("/:bookMarkId/add-problem",authMiddleware,addProblemToBookMark);

bookMarkRoutes.delete("/:bookMarkId",authMiddleware,deleteBookMark);

bookMarkRoutes.delete("/:bookMarkId/remove-problem",authMiddleware,removeProblemFromBookMark);


export default bookMarkRoutes;