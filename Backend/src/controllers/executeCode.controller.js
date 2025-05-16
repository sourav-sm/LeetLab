import { pollBatchResults, submitBatch } from "../libs/judge0.lib.js";

export const executeCode=async (req,res)=>{
    try {
        const {source_code,language_id,stdin,expected_outputs,problemId}=req.body;

        const userId=req.user.id;

        if(!Array.isArray(stdin)|| stdin.length==0 || !Array.isArray(expected_outputs) || expected_outputs.length!=stdin.length){
            return res.status(400).json({error:"Invalid or Missing test cases"})
        }

        //prepare each test cases for judge0 batch submission
        const submissions=stdin.map((input)=>({
            source_code,
            language_id,
            stdin:input,
        }));

        //send the bath of submissiom to judge0
        const submitResponse=await submitBatch(submissions)

        const tokens=submitResponse.map((res)=>res.token);

        //Poll judge0 for result of all submited test cases
        const results=await pollBatchResults(tokens);

        console.log("Result---")
        console.log(results);

        res.status(200).json({
            message:"Code Executed!"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"errow while executing the code"
        })
    }
}