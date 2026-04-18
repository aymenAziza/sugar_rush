import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllBanners, deleteBanner } from '../../../services/bannerService'

export default function BannerList() {
  const [banners, setBanners] = useState([])
  const navigate = useNavigate()

  const fetch = async () => {
    const { data } = await getAllBanners()
    setBanners(data)
  }

  useEffect(() => { fetch() }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this banner?')) return
    await deleteBanner(id)
    fetch()
  }

  return (
    <div className="admin-page">
      <section className="admin-page-header">
        <div>
          <h2>Banners</h2>
          <p className="admin-subtitle">Control the homepage visuals and promotional placements.</p>
        </div>
        <button className="admin-btn" onClick={() => navigate('/admin/banners/new')}>Add Banner</button>
      </section>

      <section className="admin-table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Link</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {banners.length === 0 && (
              <tr>
                <td colSpan="5" className="admin-empty">No banners yet.</td>
              </tr>
            )}
            {banners.map((banner) => (
              <tr key={banner._id}>
                <td><img src={banner.image} alt={banner.title} className="admin-thumb admin-thumb-wide" /></td>
                <td>{banner.title}</td>
                <td>{banner.link || 'No link'}</td>
                <td>
                  <span className={banner.is_active ? 'admin-badge-success' : 'admin-badge-muted'}>
                    {banner.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <div className="admin-table-actions">
                    <button className="admin-btn-secondary" onClick={() => navigate(`/admin/banners/edit/${banner._id}`)}>Edit</button>
                    <button className="admin-btn-danger" onClick={() => handleDelete(banner._id)}>Delete</button>
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
