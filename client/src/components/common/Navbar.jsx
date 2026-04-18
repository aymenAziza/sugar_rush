import React from 'react'
import { NavLink, Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="front-navbar">
      <div className="front-container front-navbar-inner">
        <Link to="/" className="front-brand">
          <p>Cookies Shop</p>
          <h1>Sugar Rush</h1>
        </Link>

        <nav className="front-nav-links">
          <NavLink to="/" end className={({ isActive }) => `front-nav-link${isActive ? ' active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/catalog" className={({ isActive }) => `front-nav-link${isActive ? ' active' : ''}`}>
            Catalog
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `front-nav-link${isActive ? ' active' : ''}`}>
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
