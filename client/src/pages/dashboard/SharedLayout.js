import React from 'react'
import { Navbar, Sidebar } from '../../components'
import { Outlet } from 'react-router-dom'
const SharedLayout = () => {
  return (
    <div className='homepage'>
      <Navbar />
      <Sidebar />
      <main className='dashboard-page'>
        <Outlet />
      </main>
    </div>
  )
}

export default SharedLayout