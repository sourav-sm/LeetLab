import React,{useEffect,useState} from "react";
import { useBookmarkStore } from "../store/useBookMarkStore";
import { Link } from "react-router-dom";
import { BookOpen, ChevronDown, ChevronUp, Clock, List, Tag, ExternalLink } from 'lucide-react';

const BookMarkProfile=()=>{
    const { getAllBookmark, bookMarks=[] , deleteBookmark } = useBookmarkStore();
    const [expandedBookmark, setExpandedBookmark] = useState(null);

    useEffect(() => {
        getAllBookmark();
    }, [getAllBookmark]);

    const toggleBookmark = (id) => {
    if (expandedBookmark === id) {
      setExpandedBookmark(null);
    } else {
      setExpandedBookmark(id);
    }
    };

    const handleDelete = async (id) => {
      await deleteBookmark(id);
    };

    const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case 'EASY':
        return <span className="badge badge-success">Easy</span>;
      case 'MEDIUM':
        return <span className="badge badge-warning">Medium</span>;
      case 'HARD':
        return <span className="badge badge-error">Hard</span>;
      default:
        return <span className="badge">Unknown</span>;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

   return (
    <div className="p-4 bg-base-200 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary">My BookMarks</h2>
          <button className="btn btn-primary btn-sm">
            Create Bookmark
          </button>
        </div>

        {Array.isArray(bookMarks) && bookMarks.length === 0 ? (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <h3 className="text-xl font-medium">No Bookmarks found</h3>
              <p className="text-base-content/70">Create your first Bookmark to organize problems!</p>
              <div className="card-actions justify-center mt-4">
                <button className="btn btn-primary">Create Bookmark</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {bookMarks.map((Bookmark) => (
              <div key={Bookmark.id} className="card bg-base-100 shadow-xl">
                <div className="card-body p-4">
                  {/* Bookmark Header */}
                  <div 
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleBookmark(Bookmark.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder flex items-center justify-center">
                        <div className="bg-primary text-primary-content rounded-lg w-12 items-center">
                          <BookOpen size={24} />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{Bookmark.name}</h3>
                        <div className="flex items-center gap-2 mt-1 text-sm text-base-content/70">
                          <div className="flex items-center gap-1">
                            <List size={14} />
                            <span>{Bookmark.problems.length} problems</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>Created {formatDate(Bookmark.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="btn btn-ghost btn-sm">
                      {expandedBookmark === Bookmark.id ? <ChevronUp /> : <ChevronDown />}
                    </button>
                  </div>
                  
                  {/* Description */}
                  <p className="text-base-content/80 mt-1">{Bookmark.description}</p>
                  
                  {/* Expanded Problems List */}
                  {/* {expandedBookmark === Bookmark.id && (
                    <div className="mt-4 pt-4 border-t border-base-300">
                      <h4 className="text-lg font-semibold mb-3">Problems in this Bookmark</h4>
                      
                      {Bookmark.problems.length === 0 ? (
                        <div className="alert">
                          <span>No problems added to this Bookmark yet.</span>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="table table-zebra w-full">
                            <thead>
                              <tr>
                                <th>Problem</th>
                                <th>Difficulty</th>
                                <th>Tags</th>
                                <th className="text-right">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Bookmark.problems.map((item) => (
                                <tr key={item.id} className="hover">
                                  <td className="font-medium">{item.problem.title}</td>
                                  <td>{getDifficultyBadge(item.problem.difficulty)}</td>
                                  <td>
                                    <div className="flex flex-wrap gap-1">
                                      {item.problem.tags && item.problem.tags.map((tag, idx) => (
                                        <div key={idx} className="badge badge-outline badge-sm">
                                          <Tag size={10} className="mr-1" />
                                          {tag}
                                        </div>
                                      ))}
                                    </div>
                                  </td>
                                  <td className="text-right">
                                    <Link 
                                      to={`/problem/${item.problem.id}`} 
                                      className="btn btn-xs btn-outline btn-primary"
                                    >
                                      <ExternalLink size={12} />
                                      Solve
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}


                       {Bookmark.problems.length === 0 ? (
                        <div className="alert">
                          <span>No problems added to this Bookmark yet.</span>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="table table-zebra w-full">
                            <thead>
                              <tr>
                                <th>Problem</th>
                                <th>Difficulty</th>
                                <th>Tags</th>
                                <th className="text-right">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Bookmark.problems.map((item) => (
                                <tr key={item.id} className="hover">
                                  <td className="font-medium">{item.problem.title}</td>
                                  <td>{getDifficultyBadge(item.problem.difficulty)}</td>
                                  <td>
                                    <div className="flex flex-wrap gap-1">
                                      {item.problem.tags && item.problem.tags.map((tag, idx) => (
                                        <div key={idx} className="badge badge-outline badge-sm">
                                          <Tag size={10} className="mr-1" />
                                          {tag}
                                        </div>
                                      ))}
                                    </div>
                                  </td>
                                  <td className="text-right">
                                    <Link 
                                      to={`/problem/${item.problem.id}`} 
                                      className="btn btn-xs btn-outline btn-primary"
                                    >
                                      <ExternalLink size={12} />
                                      Solve
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center mt-4">
                        <button onClick={() => handleDelete(Bookmark.id)} className="btn btn-sm btn-error">Delete Bookmark</button>
                      
                      </div>
                    </div>
                  )} */}
                  {expandedBookmark === Bookmark.id && (
  <div className="mt-4 pt-4 border-t border-base-300">
    <h4 className="text-lg font-semibold mb-3">Problems in this Bookmark</h4>

    {Bookmark.problems.length === 0 ? (
      <div className="alert">
        <span>No problems added to this Bookmark yet.</span>
      </div>
    ) : (
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Problem</th>
              <th>Difficulty</th>
              <th>Tags</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {Bookmark.problems.map((item) => (
              <tr key={item.id} className="hover">
                <td className="font-medium">{item.problem.title}</td>
                <td>{getDifficultyBadge(item.problem.difficulty)}</td>
                <td>
                  <div className="flex flex-wrap gap-1">
                    {item.problem.tags?.map((tag, idx) => (
                      <div key={idx} className="badge badge-outline badge-sm">
                        <Tag size={10} className="mr-1" />
                        {tag}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="text-right">
                  <Link 
                    to={`/problem/${item.problem.id}`} 
                    className="btn btn-xs btn-outline btn-primary"
                  >
                    <ExternalLink size={12} />
                    Solve
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}

    <div className="flex justify-between items-center mt-4">
      <button onClick={() => handleDelete(Bookmark.id)} className="btn btn-sm btn-error">
        Delete Bookmark
      </button>
    </div>
  </div>
)}

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookMarkProfile;