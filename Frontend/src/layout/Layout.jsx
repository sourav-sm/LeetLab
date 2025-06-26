  import React from 'react'
  import Navbar from '../components/Navbar'
  import { Outlet } from 'react-router-dom'
  function Layout() {
    return (
      <div className="min-h-screen max-w-screen w-full bg-black">
        <Navbar />
        <main className="w-full flex justify-center"> 
          <Outlet />
        </main>
      </div>
    )
  }

  export default Layout;