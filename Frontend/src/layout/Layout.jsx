import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
     <div className="min-h-screen w-full">
      <Navbar />
      <main className="max-w-7xl mx-auto w-full"> 
        <Outlet />
      </main>
    </div>
  )
}

export default Layout;