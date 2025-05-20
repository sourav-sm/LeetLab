import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

function LogoutButton({children}) {
  const {logout}=useAuthStore()

  const onLogout=async()=>{
    await logout();
  }

  return (
    <button className='btn btn-primary' onClick={onLogout}>
        {children}
    </button>
  )
}

export default LogoutButton