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
                    testcases,
                    codeSnippets,
                    referenceSolution,
                    userId:req.user.id
                }
            })

            return res.status(201).json(newProblem);

        }
    } catch (error) {
        
    }
}

export const getAllProblems=async(req,res)=>{

}

export const getProblemsById=async(req,res)=>{

}

export const updateProblem=async(req,res)=>{

}

export const deleteProblemById=async(req,res)=>{

}

export const getAllProblemsSolvedByUser=async(req,res)=>{

}

