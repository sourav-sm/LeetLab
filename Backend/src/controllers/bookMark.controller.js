import { db } from "../libs/db.js";

export const getAllBookmarks=async (req,res)=>{
 try {
    const  bookmarks=await db.bookmark.findMany({
        where:{
            userId:user.id
        },
        include:{
            problems:{
                include:{
                    problem:true
                }
            }
        }
    });
    res.status(200).json({
        success:true,
        message:"bookMark fetched successfully",
        bookmarks
    })
 } catch (error) {
    console.log(error);
        res.status(500).json({
            error:"Failed to fetched BookMark"
        })
 }
}

export const getBookMarks=async(req,res)=>{
    const {bookMarkId}=req.params;
    try {
    const  bookmark=await db.bookmark.findUnique({
        where:{
            id:bookMarkId,
            userId:user.id
        },
        include:{
            problems:{
                include:{
                    problem:true
                }
            }
        }
    });

    if(!bookmark){
        return res.status(404).json({
            error:"BookMark not Found"
        })
    }

    res.status(200).json({
        success:true,
        message:"bookMark fetched successfully",
        bookmark
    })
 } catch (error) {
    console.log(error);
        res.status(500).json({
            error:"Failed to fetched BookMark"
        })
 }
}

export const createBookMark=async (req,res)=>{
 try {
    const {name,description}=req.body;

    const userId=req.user.id;

    const bookMark=await db.bookMark.create({
        data:{
            name,
            description,
            userId
        }
    });

    res.status(200).json({
        success:true,
        message:"BookMark Created Successfully",
        bookMark
    })

 } catch (error) {
        console.log(error);
        res.status(500).json({
            error:"Failed to create BookMark"
        })
 }
}

export const addProblemToBookMark=async (req,res)=>{
  const {bookMarkId}=req.params;
  const {problemIds}=req.body;

  try {
    if(!Array.isArray(problemIds) ||problemIds.length==0){
        return res.status(400).json({error:"Invalid or missing ProblemId"})
    }

    const problemsInBookMark=await db.problemsInBookMark.createMany({
        data:problemIds.map((problemId)=>({
            bookMarkId,
            problemId
        }))
    })
    res.status(201).json({
        success:true,
        message:"Problem added to BookMarks",
        problemsInBookMark
    })
  } catch (error) {
    console.log(error);
        res.status(500).json({
            error:"Failed to added problem in BookMark"
        })
  }
}

export const deleteBookMark=async(req,res)=>{
   const {bookMarkId}=req.params;
    try {
     const deleteBookMark=await db.bookMark.delete({
        where:{
            id:bookMarkId
        }
     });
     res.status(200).json({
        success:true,
        message:"BookMark deleted Successfully",
        deleteBookMark
     })
   } catch (error) {
        console.log(error);
        res.status(500).json({
            error:"Failed to create BookMark"
        })    
   }
}

export const removeProblemFromBookMark=async(req,res)=>{
    const {bookMarkId}=req.params;
    const {problemIds}=req.body;

    try {
        if(!Array.isArray(problemIds) || problemIds.length==0){
            return res.status(400).json({
                error:"Invalid or missing ProblemId"
            })
        }
        
        const deleteProblem=await db.addProblemToBookMark.deleteMany({
            where:{
                bookMarkId,
                problemId:{
                    in:problemIds//we only check where problem Id is same that why 'in' is used
                }
            }
        })
        res.status(200).json({
        success:true,
        message:"BookMark deleted Successfully",
        deleteProblem
     })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error:"Failed to create BookMark"
        })
     }
}