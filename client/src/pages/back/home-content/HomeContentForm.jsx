import React, { useEffect, useState } from 'react'
import { getHomeContent, updateHomeContent } from '../../../services/homeContentService'

export default function HomeContentForm() {
  const [form, setForm] = useState({
    heroTitle: '',
    heroSubtitle: '',
    featuredTitle: '',
    featuredSubtitle: '',
    aboutTitle: '',
    aboutText: '',
  })
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const { data } = await getHomeContent()
        setForm({
          heroTitle: data.heroTitle || '',
          heroSubtitle: data.heroSubtitle || '',
          featuredTitle: data.featuredTitle || '',
          featuredSubtitle: data.featuredSubtitle || '',
          aboutTitle: data.aboutTitle || '',
          aboutText: data.aboutText || '',
        })
      } catch {
        setError('Could not load homepage content')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      await updateHomeContent(form)
      setSuccess('Homepage content updated successfully')
    } catch {
      setError('Could not save homepage content')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="admin-page">
      <section className="admin-form-card admin-form-card-wide">
        <h2>Homepage CMS</h2>
        <p className="admin-subtitle">Edit the text content used on the landing page sections.</p>
        {loading && <p className="admin-subtitle">Loading content...</p>}
        {error && <p className="admin-error">{error}</p>}
        {success && <p className="admin-success-text">{success}</p>}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="admin-field">
            <label>Hero Title</label>
            <input className="admin-input" name="heroTitle" value={form.heroTitle} onChange={handleChange} required />
          </div>

          <div className="admin-field">
            <label>Hero Subtitle</label>
            <textarea className="admin-textarea" name="heroSubtitle" value={form.heroSubtitle} onChange={handleChange} />
          </div>

          <div className="admin-field-grid">
            <div className="admin-field">
              <label>Featured Section Title</label>
              <input className="admin-input" name="featuredTitle" value={form.featuredTitle} onChange={handleChange} required />
            </div>
            <div className="admin-field">
              <label>Featured Section Subtitle</label>
              <input className="admin-input" name="featuredSubtitle" value={form.featuredSubtitle} onChange={handleChange} />
            </div>
          </div>

          <div className="admin-field-grid">
            <div className="admin-field">
              <label>About Section Title</label>
              <input className="admin-input" name="aboutTitle" value={form.aboutTitle} onChange={handleChange} required />
            </div>
            <div className="admin-field">
              <label>About Section Text</label>
              <textarea className="admin-textarea" name="aboutText" value={form.aboutText} onChange={handleChange} />
            </div>
          </div>

          <div className="admin-form-actions">
            <button className="admin-btn" type="submit" disabled={saving || loading}>
              {saving ? 'Saving...' : 'Save Homepage Content'}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
