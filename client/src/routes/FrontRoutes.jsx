import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'

export default function FrontRoutes() {
  return (
    <div className="front-site">
      <Navbar />
      <main className="front-page">
        <div className="front-container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}
