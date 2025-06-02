import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft,Mail,User,Shield,Image } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import ProblemSolvedByUser from "../components/ProblemSolvedByUser";
import BookMarkProfile from "../components/BookMarkProfile";
import ProfileSubmission from "../components/ProfileSubmission";

const Profile=()=>{
    const {authUser}=useAuthStore();
    return (
    // <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center py-10 px-4 md:px-8 w-full">
    <div className="min-h-screen bg-gradient-to-br from-base-300 to-base-200 max-w-7xl w-full">
      {/* Header with back button */}
      <div className="flex flex-row justify-between items-center w-full mb-6 pt-5 ml-5">
        <div className="flex items-center gap-3">
          <Link to={"/"} className="btn btn-circle btn-ghost">
            <ArrowLeft className="w-7 h-7" />
          </Link>
          <h1 className="text-3xl font-bold text-">Profile</h1>
        </div>
      </div>
      
      <div className="w-full max-w-6xl mx-auto">
        {/* Profile Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="avatar placeholder">
                <div className="rounded-full w-20 h-20 object-cover border-2 border-orange-500">
                  <img
                      src={"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"}
                      alt={authUser.name || "User Avatar"}
                      className="w-full h-full object-cover"
                    />
                </div>
              </div>
              {/* Name and Role Badge */}
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold">{authUser.name}</h2>
                <div className="badge badge-primary mt-2">{authUser.role}</div>
              </div>
            </div>
            
            <div className="divider"></div>
            
            {/* User Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="stat bg-base-200 rounded-box">
                <div className="stat-figure text-primary">
                  <Mail className="w-8 h-8" />
                </div>
                <div className="stat-title">Email</div>
                <div className="stat-value text-lg break-all">{authUser.email}</div>
              </div>
              
              {/* User ID */}
              <div className="stat bg-base-200 rounded-box">
                <div className="stat-figure text-primary">
                  <User className="w-8 h-8" />
                </div>
                <div className="stat-title">User ID</div>
                <div className="stat-value text-sm break-all">{authUser.id}</div>
              </div>
              
              {/* Role Status */}
              <div className="stat bg-base-200 rounded-box">
                <div className="stat-figure text-primary">
                  <Shield className="w-8 h-8" />
                </div>
                <div className="stat-title">Role</div>
                <div className="stat-value text-lg">{authUser.role}</div>
                <div className="stat-desc">
                  {authUser.role === "ADMIN" ? "Full system access" : "Limited access"}
                </div>
              </div>
              
              {/* Profile Image Status */}
              <div className="stat bg-base-200 rounded-box">
                <div className="stat-figure text-primary">
                  <Image className="w-8 h-8" />
                </div>
                <div className="stat-title">Profile Image</div>
                <div className="stat-value text-lg">
                  {authUser.image ? "Uploaded" : "Not Set"}
                </div>
                <div className="stat-desc">
                  {authUser.image ? "Image available" : "Upload a profile picture"}
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="card-actions justify-end mt-6">
              <button className="btn btn-outline btn-primary">Edit Profile</button>
              <button className="btn btn-primary">Change Password</button>
            </div>
          </div>
        </div>
        
     
      </div>
      <div>
        <ProfileSubmission/>
        <ProblemSolvedByUser/>
        <BookMarkProfile/>
      </div>
      
      {/* PLaylist created by the user and their actions */}
    </div>
  );
}

export default Profile;