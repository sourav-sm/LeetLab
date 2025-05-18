import React, { useEffect } from "react"
import { Routes,Route,Navigate } from "react-router-dom"
import {Toaster} from "react-hot-toast";
import { Loader } from "lucide-react";

import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import { useAuthStore } from "./store/useAuthStore";


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
      <Toaster>
        <Routes>
          <Route 
              path="/" 
              element={authUser? <HomePage/>:<LoginPage/>}/>
          
          <Route 
              path="/login" 
              element={!authUser?<LoginPage/>:<Navigate to={"/"}/>}/>
          
          <Route 
              path="/signup" 
              element={!authUser?<SignUpPage/>:<Navigate to={"/"}/>}/>
        </Routes>
      </Toaster>
    </div>
  )
}

export default App
  