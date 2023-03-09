import React from 'react'
import { AdminNavbar, Sidebar } from '../../components'
import { Outlet } from 'react-router-dom'
const SharedLayout = () => {
  return (
    <div className='homepage'>
      <AdminNavbar />
      <Sidebar />
      <main className='dashboard-page'>
        <Outlet />
      </main>
    </div>
  )
}

export default SharedLayout