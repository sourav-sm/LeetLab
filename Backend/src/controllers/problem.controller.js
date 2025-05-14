import { getJudge0LanguageId, pollBatchResults, submitBatch } from "../libs/judge0.lib.js";

export const createProblems=async(req,res)=>{
    //going to get the all the data from req body
    const {title,description,difficulty,tags,examples,constraints,testcases,codeSnippets,referenceSolution}=req.body;
    //going to check the user role once again
    if(req.user.role!="ADMIN"){
        return res.status(403).json({
            message:"You are not allowed to create Problems"
        })
    }
    //loop through each reference solution for different languages
    try {
        for(const [language,solutionCode] of Object.entries(referenceSolution)){
            const languageId=getJudge0LanguageId(language);
            console.log("language id is ",languageId)
            console.log("language  is ",language)
            if(!languageId){
                return res.status(400).json({error:`Language ${language} is not supported`})
            }
            if(!languageId){
                return res.status(400).json({message:`error:language ${language} is not supported`})
            }

            //make an array of submitions for each test cases
            const submitions=testcases.map(({input,output})=>({
                source_code:solutionCode,
                language_id:languageId,
                stdin:input,
                expected_output:output,
            }))

            const submitionsResult=await submitBatch(submitions);
            const token=submitionsResult.map((res)=>res.token);
            const results=await pollBatchResults(token);

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
                    referenceSolution,
                    userId:req.user.id
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
    //id
    //id-->problem (condition)
    //baaki kaam same as create

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

}
