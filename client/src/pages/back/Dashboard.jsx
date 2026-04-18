import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getAllCookies } from '../../services/cookieService'
import { getAllCategories } from '../../services/categoryService'
import { getAllBanners } from '../../services/bannerService'
import { getAllMessages } from '../../services/contactService'

export default function Dashboard() {
  const { admin } = useAuth()
  const [stats, setStats] = useState({
    cookies: [],
    categories: [],
    banners: [],
    messages: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true)

      try {
        const [
          { data: cookies },
          { data: categories },
          { data: banners },
          { data: messages },
        ] = await Promise.all([
          getAllCookies(),
          getAllCategories(),
          getAllBanners(),
          getAllMessages(),
        ])

        setStats({ cookies, categories, banners, messages })
      } catch (error) {
        console.error('Failed to load dashboard data', error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [])

  const summary = useMemo(() => {
    const featuredCookies = stats.cookies.filter((cookie) => cookie.is_featured).length
    const availableCookies = stats.cookies.filter((cookie) => cookie.is_available).length
    const activeBanners = stats.banners.filter((banner) => banner.is_active).length
    const unreadMessages = stats.messages.filter((message) => !message.is_read).length

    return {
      totalCookies: stats.cookies.length,
      featuredCookies,
      availableCookies,
      totalCategories: stats.categories.length,
      activeBanners,
      unreadMessages,
      latestMessages: stats.messages.slice(0, 4),
    }
  }, [stats])

  return (
    <div className="admin-page">
      <section className="admin-hero">
        <div>
          <p className="admin-brand-label admin-brand-label-dark">Overview</p>
          <h2 className="admin-hero-title">Welcome back, {admin?.name || 'Admin'}</h2>
          <p className="admin-hero-copy">
            Keep the Sugar Rush catalogue fresh, monitor homepage visibility, and stay on top of customer messages from one place.
          </p>
        </div>
        <div className="admin-hero-badge">
          {loading ? 'Refreshing workspace...' : `${summary.unreadMessages} unread message${summary.unreadMessages === 1 ? '' : 's'}`}
        </div>
      </section>

      <section className="admin-dashboard-grid">
        <article className="admin-card admin-metric-card">
          <p className="admin-stat-label">Products</p>
          <p className="admin-stat-value">{loading ? '...' : summary.totalCookies}</p>
          <p className="admin-subtitle">{loading ? 'Loading cookie data...' : `${summary.availableCookies} available, ${summary.featuredCookies} featured`}</p>
        </article>

        <article className="admin-card admin-metric-card">
          <p className="admin-stat-label">Categories</p>
          <p className="admin-stat-value">{loading ? '...' : summary.totalCategories}</p>
          <p className="admin-subtitle">Collections available for your public catalogue.</p>
        </article>

        <article className="admin-card admin-metric-card">
          <p className="admin-stat-label">Banners</p>
          <p className="admin-stat-value">{loading ? '...' : summary.activeBanners}</p>
          <p className="admin-subtitle">Active hero and promotional visuals currently published.</p>
        </article>
      </section>

      <section className="admin-dashboard-columns">
        <article className="admin-card">
          <div className="admin-page-header">
            <div>
              <h2>Quick Actions</h2>
              <p className="admin-subtitle">Jump straight into the most common admin tasks.</p>
            </div>
          </div>

          <div className="admin-quick-links">
            <Link className="admin-quick-link" to="/admin/cookies/new">
              <strong>Add Cookie</strong>
              <span>Create a new product card with image, ingredients, and pricing.</span>
            </Link>
            <Link className="admin-quick-link" to="/admin/banners/new">
              <strong>Create Banner</strong>
              <span>Publish a fresh visual for the landing page.</span>
            </Link>
            <Link className="admin-quick-link" to="/admin/home-content">
              <strong>Edit Homepage</strong>
              <span>Update hero copy, featured section text, and about content.</span>
            </Link>
            <Link className="admin-quick-link" to="/admin/messages">
              <strong>Review Messages</strong>
              <span>Check new customer inquiries and mark them as handled.</span>
            </Link>
          </div>
        </article>

        <article className="admin-card">
          <div className="admin-page-header">
            <div>
              <h2>Recent Messages</h2>
              <p className="admin-subtitle">A quick view of the latest customer contact activity.</p>
            </div>
          </div>

          <div className="admin-message-list">
            {!loading && summary.latestMessages.length === 0 && (
              <p className="admin-empty">No messages yet.</p>
            )}

            {loading && <p className="admin-subtitle">Loading recent messages...</p>}

            {summary.latestMessages.map((message) => (
              <div key={message._id} className={`admin-message-preview${message.is_read ? '' : ' unread'}`}>
                <div className="admin-message-preview-head">
                  <strong>{message.name}</strong>
                  <span className={message.is_read ? 'admin-badge-muted' : 'admin-badge-warning'}>
                    {message.is_read ? 'Read' : 'New'}
                  </span>
                </div>
                <p>{message.email}</p>
                <p className="admin-message-preview-copy">{message.message}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  )
}
