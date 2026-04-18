import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllCookies, deleteCookie } from '../../../services/cookieService'

export default function CookieList() {
  const [cookies, setCookies] = useState([])
  const navigate = useNavigate()

  const fetch = async () => {
    const { data } = await getAllCookies()
    setCookies(data)
  }

  useEffect(() => { fetch() }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this cookie?')) return
    await deleteCookie(id)
    fetch()
  }

  return (
    <div className="admin-page">
      <section className="admin-page-header">
        <div>
          <h2>Cookies</h2>
          <p className="admin-subtitle">Manage products, pricing, availability, and featured items.</p>
        </div>
        <button className="admin-btn" onClick={() => navigate('/admin/cookies/new')}>Add Cookie</button>
      </section>

      <section className="admin-table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Availability</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cookies.length === 0 && (
              <tr>
                <td colSpan="7" className="admin-empty">No cookies yet.</td>
              </tr>
            )}
            {cookies.map((cookie) => (
              <tr key={cookie._id}>
                <td><img src={cookie.image} alt={cookie.name} className="admin-thumb" /></td>
                <td>{cookie.name}</td>
                <td>{cookie.category?.name || 'Uncategorized'}</td>
                <td>{cookie.price} TND</td>
                <td>
                  <span className={cookie.is_available ? 'admin-badge-success' : 'admin-badge-muted'}>
                    {cookie.is_available ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td>
                  <span className={cookie.is_featured ? 'admin-badge-warning' : 'admin-badge-muted'}>
                    {cookie.is_featured ? 'Featured' : 'Standard'}
                  </span>
                </td>
                <td>
                  <div className="admin-table-actions">
                    <button className="admin-btn-secondary" onClick={() => navigate(`/admin/cookies/edit/${cookie._id}`)}>Edit</button>
                    <button className="admin-btn-danger" onClick={() => handleDelete(cookie._id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
