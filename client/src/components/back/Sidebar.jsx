import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const navItems = [
  { label: 'Dashboard', to: '/admin/dashboard' },
  { label: 'Cookies', to: '/admin/cookies' },
  { label: 'Categories', to: '/admin/categories' },
  { label: 'Tags', to: '/admin/tags' },
  { label: 'Banners', to: '/admin/banners' },
  { label: 'Homepage CMS', to: '/admin/home-content' },
  { label: 'Messages', to: '/admin/messages' },
]

export default function Sidebar() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <aside className="admin-sidebar">
      <div>
        <div className="admin-brand">
          <p className="admin-brand-label">Sugar Rush</p>
          <h2 className="admin-brand-title">Admin Suite</h2>
          <p className="admin-brand-copy">
            Control the catalog, homepage content, banners, and customer inbox from one polished workspace.
          </p>
        </div>

        <nav className="admin-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `admin-nav-link${isActive ? ' active' : ''}`}
            >
              <span>{item.label}</span>
              <span className="admin-nav-indicator" />
            </NavLink>
          ))}
        </nav>
      </div>

      <button type="button" onClick={handleLogout} className="admin-logout">
        Logout
      </button>
    </aside>
  )
}
