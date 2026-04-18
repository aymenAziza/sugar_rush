import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createBanner, updateBanner, getAllBanners } from '../../../services/bannerService'

export default function BannerForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [form, setForm] = useState({ title: '', link: '', is_active: true })
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isEdit) {
      getAllBanners().then(({ data }) => {
        const banner = data.find((b) => b._id === id)
        if (banner) {
          setForm({ title: banner.title, link: banner.link || '', is_active: banner.is_active })
          setPreview(banner.image)
        }
      })
    }
  }, [id, isEdit])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleImage = (e) => {
    const file = e.target.files[0]
    setImage(file)
    if (file) setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const formData = new FormData()
      Object.entries(form).forEach(([k, v]) => formData.append(k, v))
      if (image) formData.append('image', image)
      if (isEdit) await updateBanner(id, formData)
      else await createBanner(formData)
      navigate('/admin/banners')
    } catch {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-page">
      <section className="admin-form-card">
        <h2>{isEdit ? 'Edit Banner' : 'Add Banner'}</h2>
        <p className="admin-subtitle">Set the tone of the storefront with polished promotional visuals.</p>
        {error && <p className="admin-error">{error}</p>}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="admin-field-grid">
            <div className="admin-field">
              <label>Title</label>
              <input className="admin-input" name="title" value={form.title} onChange={handleChange} required />
            </div>
            <div className="admin-field">
              <label>Link</label>
              <input className="admin-input" name="link" value={form.link} onChange={handleChange} />
            </div>
          </div>

          <div className="admin-field">
            <label>Image</label>
            <input className="admin-file" type="file" accept="image/*" onChange={handleImage} />
            {preview && <img src={preview} alt="preview" className="admin-preview admin-preview-wide" />}
          </div>

          <label className="admin-checkbox">
            <input type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} />
            Active banner
          </label>

          <div className="admin-form-actions">
            <button className="admin-btn" type="submit" disabled={loading}>
              {loading ? 'Saving...' : isEdit ? 'Update Banner' : 'Create Banner'}
            </button>
            <button className="admin-btn-ghost" type="button" onClick={() => navigate('/admin/banners')}>
              Cancel
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
