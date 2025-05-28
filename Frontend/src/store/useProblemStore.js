import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import {toast} from "react-hot-toast";

export const useProblemStore=create((set)=>({
    problems:[],
    problem:[],
    solvedProblems:[],
    isProblemsLoading:false,
    isProblemLoading:false,

    getAllProblems:async()=>{
        try {
            set({isProblemLoading:true})
            const res=await axiosInstance.get("/problems/get-all-problems");
            set({problems:res.data.problems})
        } catch (error) {
            console.error("Error while fetching all problems",error);
            toast.error("Error in getting problems")
        }finally{
            set({isProblemsLoading:false})
        }
    },

    getProblemById:async(id)=>{
        try {
          set({isProblemLoading:true})
          const res=await axiosInstance.get(`/problems/get-problem/${id}`);
          set({problem:res.data.problem})

        } catch (error) {
            console.log("Error in getting the problem",error);
            toast.error("Error in getting the problem")
        }finally{
            set({isProblemLoading:false})
        }
    },

    getSolvedProblemByUser:async()=>{
        try {
            const res=await axiosInstance.get("/problems/get-all-solved-problems")
            set({solvedProblems:res.data.solvedProblems})
        } catch (error) {
            console.log("Error in getting the solved problems by user",error);
            toast.error("Error in getting the solved problems by user")   
        }
    }
}))