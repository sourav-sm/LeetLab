import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useBookmarkStore=create((set,get)=>({
    bookMarks:[],
    currentBookmark:null,
    isLoading:false,
    error:null,

    createBookmark:async (BookmarkData)=>{
        try {
            set({isLoading:true});
            const response=await axiosInstance.post("/bookmark/create-bookmark",
                BookmarkData
            )

            set((state)=>({
                bookMarks:[...state.bookMarks,response.data.bookMarks]
            }));

            toast.success("BookMark Created successfully");
            return response.data.bookMarks
        } catch (error) {
            console.error("Error in creating Bookmark",error);
            toast.error(error.response?.data?.error || "Failed to ceate bookmark");
            throw error;
        }finally{
            set({isLoading:false});
        }
    },

    getAllBookmark:async()=>{
        try {
            set({isLoading:true})
            const response=await axiosInstance.get("/bookmark");
            set({bookMarks:response.data.bookMarks});
        } catch (error) {
            console.error("Error in Getting all Bookmark",error);
            toast.error("Failed to Get all Bookmark");
            throw error;
        }finally{
            set({isLoading:false})
        }
    },

    getBookmarkDetails:async(bookmarkId)=>{
        try {
            set({isLoading:true})
            const response=await axiosInstance.get(`/bookmark/${bookmarkId}`)
            set({currentBookmark:response.data.bookMarks});
        }catch (error) {
            console.error("Error in Getting all Bookmark",error);
            toast.error("Failed to Get all Bookmark");
            throw error;
        }finally{
            set({isLoading:false})
        }
    },

    addProblemToBookmark:async(bookmarkId,problemIds)=>{
        try {
            set({isLoading:true})
           await axiosInstance.post(`/bookmark/${bookmarkId}/add-problem`,{
                problemIds,
            });

            toast.success("Problem Added to Bookmark");

            ////refresh the bookmark details
            if(get().currentBookmark?.id===bookmarkId){
                await get().getBookmarkDetails(bookmarkId);
            }
        } catch (error) {
            console.error("Error in adding problem to Bookmark",error);
            toast.error("Failed to Add problem in Bookmark");
            throw error;
        }finally{
            set({isLoading:false})
        }
    },

    removeProblemFromBookmark:async(bookmarkId,problemIds)=>{
        try {
            set({isLoading:true})
            await axiosInstance.post(`/bookmark/${bookmarkId}/remove-problem`,{
                problemIds
            });
            toast.success("Problem removed from Bookmark");
            
            //refresh the bookmark details
            if(get().currentBookmark?.id===bookmarkId){
                await get().getBookmarkDetails(bookmarkId);
            }
        } catch (error) {
            console.error("Error in removing problem from Bookmark",error);
            toast.error("Failed to remove problem from Bookmark");
            throw error;
        }finally{
            set({isLoading:false})
        }
    },

    deleteBookmark:async(bookMarkId)=>{
        try {
            set({isLoading:true})
            await axiosInstance.post(`/bookmark/${bookMarkId}`);
            set((state)=>({
                bookMarks:state.bookMarks.filter((p)=>p.id!==bookMarkId),
            }));
            toast.success("Bookmark deleted successfully");
        } catch (error) {
            console.error("Error in deleting Bookmark",error);
            toast.error("Failed to delete Bookmark");
            throw error;
        }finally{
            set({isLoading:false})
        }
    },
}))