import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import React from 'react'
import Sidebar from '../components/back/Sidebar'

export default function BackRoutes() {
  const { token } = useAuth()
  if (!token) return <Navigate to="/admin/login" />

  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-main">
        <div className="admin-topbar">
          <div>
            <h1>Admin Workspace</h1>
            <p>Manage the Sugar Rush catalog, visibility, and customer communication from one place.</p>
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  )
}
