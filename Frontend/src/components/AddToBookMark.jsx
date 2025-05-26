import React,{useEffect,useState} from 'react'
import {X,Plus,Loader} from "lucide-react"
import { useBookmarkStore } from '../store/useBookMarkStore'

const AddToBookmarkModel=({isOpen,onClose,problemId})=> {
    const {bookMarks,getAllBookmark, addProblemToBookmark,isLoading}=useBookmarkStore();
    const [selectedBookmark,setSelectedBookmark]=useState('');
   
    useEffect(()=>{
        if(isOpen){
            getAllBookmark();
        }
    },[isOpen]);

    const handleSubmit=async (e)=>{
        e.preventDefault();
        if(!selectedBookmark)return;

        await addProblemToBookmark(selectedBookmark,[problemId]);
        onclose();
    };

    if(!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-base-300">
          <h3 className="text-xl font-bold">Add to Playlist</h3>
          <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Select Playlist</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={selectedBookmark}
              onChange={(e) => setSelectedPlaylist(e.target.value)}
              disabled={isLoading}
            >
              <option value="">Select a playlist</option>
              {bookMarks.map((bookMark) => (
                <option key={bookMark.id} value={bookMark.id}>
                  {bookMark.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={!selectedBookmark || isLoading}
            >
              {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Add to Playlist
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddToBookmarkModel;