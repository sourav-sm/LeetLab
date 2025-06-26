import React, { useMemo, useState,useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore' 
import { Link } from 'react-router-dom'
import { Bookmark,PencilIcon,Trash,TrashIcon,Plug, Plus } from 'lucide-react';
import {useActions} from "../store/useActions";
import CreateBookmarkModal from "./CreateBookmarkModal";
import { useBookmarkStore } from "../store/useBookMarkStore";
import AddToBookmarkModel from "./AddToBookMark"
import { useProblemStore } from '../store/useProblemStore';
import { CiSearch } from "react-icons/ci";

function ProblemTable({problems}) {
  const { getSolvedProblemByUser,solvedProblems} = useProblemStore();
    const {authUser}=useAuthStore();
    const { onDeleteProblem } = useActions();
    const { createBookmark } = useBookmarkStore();
    const [search,setSearch]=useState("");
    const [difficulty,setDifficulty]=useState("ALL");
    const [selectedTag,setSelectedTag]=useState("ALL");
    const [currentPage,setCurrentPage]=useState(1);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isAddToBookmarkModalOpen, setIsAddToBookmarkModalOpen] = useState(false);
    const [selectedProblemId, setSelectedProblemId] = useState(null);

    const allTags=useMemo(()=>{
        if(!Array.isArray(problems))return [];
        const tagsSet=new Set()
        problems.forEach((p)=>p.tags?.forEach((t)=>tagsSet.add(t)));
        return Array.from(tagsSet);
    },[problems])

    //fetch all submission
    useEffect(() => {
        getSolvedProblemByUser();
    }, [getSolvedProblemByUser]);
    
    
    const filteredProblems=useMemo(()=>{
        return (problems || [])
        .filter((problem)=>problem.title.toLowerCase().includes(search.toLowerCase()))
        .filter((problem)=>difficulty==="ALL" ? true:problem.difficulty===difficulty)
        .filter((problem)=>selectedTag==="ALL"?true:problem.tags?.includes(selectedTag));
    },[problems,search,difficulty,selectedTag])  

    const itemsPerPage=5;
    const totalPages=Math.ceil(filteredProblems.length/itemsPerPage);
    
    useEffect(() => {
  // if currentPage is greater than totalPages, reset it to last page or 1 if no pages
  if (currentPage > totalPages) {
    setCurrentPage(totalPages === 0 ? 1 : totalPages);
  }
}, [currentPage, totalPages]);
    
    const paginatedProblems=useMemo(()=>{
        return filteredProblems.slice(
            (currentPage-1)*itemsPerPage,
            currentPage*itemsPerPage)
    },[filteredProblems,currentPage]);


    const difficulties=["EASY","MEDIUM","HARD"];

    const handleDelete = (id) => {
    onDeleteProblem(id);
  };

  const handleCreateBookmark = async (data) => {
    await createBookmark(data);
  };

  const handleAddToBookmark = (problemId) => {
    setSelectedProblemId(problemId);
    setIsAddToBookmarkModalOpen(true);
  };

  return (
     <div className="w-full max-w-7xl mx-auto mt-10">
      {/* Header with Create Bookmark Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Problems</h2>
        <button
          className="btn btn-primary gap-2 bg-blue-800"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Create Bookmark
        </button>
      </div>

       <div className="flex flex-wrap p-5 bg-gray-900/50 border-gray-800 rounded-2xl justify-between items-center mb-6 gap-4">
  <div className="relative w-full md:w-1/3">
  <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"/>
    <input
      type="text"
      placeholder="Search by title"
      className="input input-bordered w-full pl-10 bg-base-200"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
</div>

        <select
          className="select select-bordered bg-base-200"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="ALL">All Difficulties</option>
          {difficulties.map((diff) => (
            <option key={diff} value={diff}>
              {diff.charAt(0).toUpperCase() + diff.slice(1).toLowerCase()}
            </option>
          ))} 
        </select>
        <select
          className="select select-bordered bg-base-200"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          <option value="ALL">All Tags</option>
          {allTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
      <div className='overflow-x-auto rounded-xl shadow-md'>
        <table className='table table-zebra table-lg text-base-content bg-gray-900/50 border-gray-800'>
            <thead className='bg-gray-900/50 border-gray-800'>
                <tr>
                    <th>Solved</th>
                    <th>Title</th>
                    <th>Tags</th>
                    <th>Company</th>
                    <th>Difficulty</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                 paginatedProblems.length>0?(
                    paginatedProblems.map((problem)=>{
                const isSolved = solvedProblems.some(sp=>sp.id===problem.id)
                return (
                    <tr key={problem.id}>
                        <td>
                            <input type="checkbox" checked={isSolved} className='checkbox checkbox-sm'/>
                        </td>
                        <td>
                            <Link to={`/problem/${problem.id}`} className='font-semibold hover:underline'>
                                {problem.title}
                            </Link>
                        </td>
                        <td>
                            <div className='flex flex-wrap gap-1'>
                                {(problem.tags || []).map((tag,idx)=>(
                                    <span key={idx} className='badge badge-outline badge-warning text-sm font-bold'>
                                        {tag},
                                    </span>
                                ))}
                            </div>
                        </td>
                        <td>
                          <div className='flex flex-wrap gap-1'>
                            {(problem.companyTags || []).map((cmp,idx)=>(
                              // <span key={idx} className='text-md font-bold bg-red-700 px-0.5 rounded-2xl text-black'>
                              <span key={idx} className='text-md font-bold badge badge-primary'>
                                 {cmp}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td>
                            <span
                            className={`badge font-semibold text-xs text-white 
                                ${
                                    problem.difficulty==="EASY"?"badge-success":
                                    problem.difficulty==="MEDIUM"?"badge-warning":
                                    "badge-error"
                                }
                            `}>
                                {problem.difficulty}
                            </span>
                        </td>
                        <td>
                            <div className='flex flex-col md:flex-row gap-2 items-start md:items-center'>
                                {
                                    authUser?.role==="ADMIN" && (
                                        <div className='flex gap-2'>
                                            <button onClick={() => handleDelete(problem.id)}
                                                className="btn btn-sm btn-error"
                                             >
                                                <TrashIcon className='w-4 h-4 text-white'/>
                                            </button>           
                                        </div>
                                    )}
                                 <button className="btn btn-sm btn-outline flex gap-2 items-center"
                                     onClick={() => handleAddToBookmark(problem.id)}
                                >
                                <Bookmark className="w-4 h-4" />
                                <span className="hidden sm:inline">Save to Bookmark</span>
                                </button>   
                            </div>
                        </td>
                    </tr>
                )
              })
              ):(
                  <tr>
                      <td colSpan={5} className='text-center py-6 text-gray-500'>
                          No Problems Found
                      </td>
                  </tr>
                  )
              }
            </tbody>
        </table>  
      </div>

      <div className='flex justify-center mt-6 gap-2'>
        <button className='btn btn-sm'
          disabled={currentPage===1}
          onClick={()=>setCurrentPage((prev)=>prev-1)}
        >
            Prev
        </button>
        <span className='btn btn-ghost btn-sm'>
            {currentPage}/{totalPages}
        </span>
        <button className='btn btn-sm'
          disabled={currentPage===totalPages}
          onClick={()=>setCurrentPage((prev)=>prev+1)}
        >
            Next
        </button>
      </div>
        
          <CreateBookmarkModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateBookmark}
      />
      
      <AddToBookmarkModel
        isOpen={isAddToBookmarkModalOpen}
        onClose={() => setIsAddToBookmarkModalOpen(false)}
        problemId={selectedProblemId}
      />
    </div>
  )
}

export default ProblemTable