import React, { useEffect } from "react"
import { Routes,Route,Navigate } from "react-router-dom";
import {Toaster} from "react-hot-toast";
import { Loader } from "lucide-react";

import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import { useAuthStore } from "./store/useAuthStore";
import Layout from "./layout/Layout";
import AdminRoute from "./components/AdminRoute";
import AddProblem from "./pages/AddProblem";
import ProblemPage from "./pages/ProblemPage";
import Profile from "./pages/Profile";
import LandingPage from "./pages/LandingPage";


const App=()=>{
  const {authUser,checkAuth,isCheckingAuth}=useAuthStore()

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  if(isCheckingAuth && !authUser){
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin"/>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-start">
      <Toaster/>
         <Routes>
          <Route 
            path="/" 
            element={!authUser ? <LandingPage /> : <Navigate to="/home" />}
          />
          <Route 
            path="/" 
            element={authUser ? <Layout /> : <Navigate to="/" />}
          >
            <Route path="home" element={<HomePage />} />
            <Route path="problem/:id" element={<ProblemPage />} />
            <Route path="profile" element={<Profile />} />
        
            <Route element={<AdminRoute />}>
              <Route path="add-problem" element={<AddProblem />} />
            </Route>
          </Route>
        
          <Route 
            path="/login" 
            element={!authUser ? <LoginPage /> : <Navigate to="/home" />}
          />
          <Route 
            path="/signup" 
            element={!authUser ? <SignUpPage /> : <Navigate to="/home" />}
          />
      </Routes>
    </div>
  )
}

export default App;
  