import { getJudge0LanguageId, pollBatchResults, submitBatch } from "../libs/judge0.lib.js";
import {db} from "../libs/db.js"

export const createProblems=async(req,res)=>{
    //going to get the all the data from req body
    const {title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippets,
        referenceSolutions,
        editorial
    }=req.body;
    //going to check the user role once again
    if(req.user.role!="ADMIN"){
        return res.status(403).json({
            message:"You are not allowed to create Problems"
        })
    }
    //loop through each reference solution for different languages
    try {
        for(const [language,solutionCode] of Object.entries(referenceSolutions)){
            const languageId=getJudge0LanguageId(language);
            if(!languageId){
                return res.status(400).json({error:`Language ${language} is not supported`})
            }

            //make an array of submitions for each test cases
            const submitions=testcases.map(({input,output})=>({
                source_code:solutionCode,
                language_id:languageId,
                stdin:input,
                expected_output:output,
            }));

            const submitionsResult=await submitBatch(submitions);
            const tokens=submitionsResult.map((res)=>res.token);
            const results=await pollBatchResults(tokens);

            for(let i=0;i<results.length;i++){
                const result=results[i];
                console.log("Result----",result);

                if(result.status.id !==3){
                    return res.status(400).json({
                        error:`Testcase ${i+1} failed for language ${language}`
                    })
                }
            }

            const newProblem = await db.problem.create({
                data:{
                    title,
                    description,
                    difficulty,
                    tags,
                    examples,
                    constraints,
                    testcases,
                    codeSnippets,
                    referenceSolutions,
                    userId:req.user.id,
                    editorial
                }
            })

            return res.status(201).json({
                sucess:true,
                message:"Problem Created Successfully",
                problem:newProblem   
            });

        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error:"Error while creating problems",
        })
    }
//     }catch(error){
//   if (error.response) {
//     console.log('Judge0 response:', error.response.data);
//   } else {
//     console.error('Other error:', error.message);
//   }
// }

}

export const getAllProblems=async(req,res)=>{
  try {
    const problems=await db.problem.findMany();

    if(!problems){
        return res.status(404).json({
            error:"No problems Found"
        })
    }

    res.status(200).json({
        sucess:true,
        message:"Message Fetched Successfully",
        problems
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
        error:"Error while fetching all problems"
    })
  }
}

export const getProblemById=async(req,res)=>{
  const {id}=req.params;

  try {
    const problem=await db.problem.findUnique(
       { 
        where:{
            id
          }
        }
    )

    if(!problem){
        return res.status(404).json({
            error:"No problem Found"
        })
    }

    res.status(200).json({
        sucess:true,
        message:"Message Fetched Successfully",
        problem
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
        error:"Error while fetching problem"
    })
  }
}

export const updateProblem=async(req,res)=>{
    const id=req.params.id;

    try{
        const problem=await db.problem.findUnique(
        {
            where:{
                id
            }
        }
        )
        
        if(!problem){
            return res.status(404).json({
                message:"problem not found"
            })
        }

        //updating logic
        const{
            title,
            description,
            difficulty,
            tags,
            examples,
            constraints,
            testcases,
            codeSnippets,
            referenceSolutions,
            editorial
        }=req.body;

        if(req.user.role!="ADMIN"){
            return res.status(403).json({
                message:"You are not allowed to update the problem"
            })
        }

        try {
            for(const [language,solutionCode] of Object.entries(referenceSolutions)){
                const languageId=getJudge0LanguageId(language);
                if(!languageId){
                    return res.status(400).json({error:`Language ${language} is not supported`})
                }

                const submissions=testcases.map(({input,output})=>({
                    source_code:solutionCode,
                    language_id:languageId,
                    stdin:input,
                    expected_output:output
                }))

                const submitionsResult=await submitBatch(submissions);
                const tokens=submitionsResult.map((res)=>res.token);
                const results=await pollBatchResults(tokens);

                for(let i=0;i<results.length;i++){
                    const result=results[i];
                    console.log("Result---",result);

                    if(result.status.id!=3){
                        return res.status(400).json({
                        error:`Testcase ${i+1} failed for language ${language}`
                    })
                    }
                }

                const updateProblem=await db.problem.update({
                    where:{
                        id
                    },
                    data:{
                        title,
                        description,
                        difficulty,
                        tags,
                        examples,
                        constraints,
                        testcases,
                        codeSnippets,
                        referenceSolutions,
                        userId:req.user.id,
                        editorial
                    }
                })

                return res.status(201).json({
                    sucess:true,
                    message:"Problem updated Successfully",
                    problem:updateProblem
                });

                
            }
        } catch (error) {
          console.error(error);
          return res.status(500).json({
            error:"Error while updating the problem "
          })   
        }

    }catch(error){
        console.log(error);
        return res.status(500).json({
            error:"error while updating problem"
        })
    }
}

export const deleteProblemById=async(req,res)=>{
  const {id}=req.params;
  try {
    const problem=await db.problem.findUnique({
        where:{
            id
        }
    })

    if(!problem){
        return res.status(404).json({
            error:"Problem not found"
        })
    }

    await db.problem.delete({
        where:{
            id
        }
    })

    res.status(200).json({
        sucess:true,
        message:"Problem Deleted Successfully",
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
        error:"Error while deleting the problems"
    })
  }
}

export const getAllProblemsSolvedByUser=async(req,res)=>{
   try {
    const problems=await db.findMany({
        where:{
            solvedBy:{
                some:{
                    userId:req.user.id
                }
            }
        },
        include:{
            solvedBy:{
                where:{
                    userId:req.user.id
                }
            }
        }

    })
        res.status(200).json({
            success:true,
            message:"Solved Problem fetched successfully",
            problems
        })
   } catch (error) {
    console.log(error);
     res.status(500).json({
        error:"failed to fetched solved problems"
     })
   }
}
