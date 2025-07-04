import React, { useEffect } from 'react'
import { Loader } from 'lucide-react'
import { useProblemStore} from '../store/useProblemStore';
import ProblemTable from '../components/ProblemTable';

function HomePage() {
  const {getAllProblems,problems,isProblemsLoading}=useProblemStore();
  console.log("problems",problems)

  useEffect(()=>{
    getAllProblems();
  },[getAllProblems]);

  if(isProblemsLoading){
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin'/>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items mt-14 px-4 bg-black">
      <div className="absolute top-16 left-0 w-1/3 h-1/3 opacity-30 blur-3xl rounded-md bottom-9"></div>
      <h1 className="text-4xl font-extrabold z-10 ">
        Welcome to <span className="text-blue-600">AlgoPundit</span>
      </h1>

      <p className="mt-4  text-lg font-semibold text-gray-500 dark:text-gray-400 z-10">
       You’ve just taken the first step toward mastering coding interviews. Dive into handpicked problems, track <br/>
       your progress, and build the confidence to crack even the toughest technical rounds.
      </p>

       {
        problems.length > 0 ? <ProblemTable problems={problems}/> : (
            <p className="mt-10 text-center text-lg font-semibold text-gray-500 dark:text-gray-400 z-10 border border-primary px-4 py-2 rounded-md border-dashed">
          No problems found
        </p>
        )
      } 
    </div>
  );
}

export default HomePage