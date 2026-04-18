import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createCategory, getCategory, updateCategory } from '../../../services/categoryService'

export default function CategoryForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [form, setForm] = useState({ name: '', slug: '' })
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isEdit) {
      getCategory(id).then(({ data }) => {
        setForm({ name: data.name, slug: data.slug })
        setPreview(data.image)
      })
    }
  }, [id, isEdit])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
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
      if (isEdit) await updateCategory(id, formData)
      else await createCategory(formData)
      navigate('/admin/categories')
    } catch {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-page">
      <section className="admin-form-card">
        <h2>{isEdit ? 'Edit Category' : 'Add Category'}</h2>
        <p className="admin-subtitle">Design the storefront structure with clean, reusable categories.</p>
        {error && <p className="admin-error">{error}</p>}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="admin-field-grid">
            <div className="admin-field">
              <label>Name</label>
              <input className="admin-input" name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="admin-field">
              <label>Slug</label>
              <input className="admin-input" name="slug" value={form.slug} onChange={handleChange} required />
            </div>
          </div>

          <div className="admin-field">
            <label>Image</label>
            <input className="admin-file" type="file" accept="image/*" onChange={handleImage} />
            {preview && <img src={preview} alt="preview" className="admin-preview" />}
          </div>

          <div className="admin-form-actions">
            <button className="admin-btn" type="submit" disabled={loading}>
              {loading ? 'Saving...' : isEdit ? 'Update Category' : 'Create Category'}
            </button>
            <button className="admin-btn-ghost" type="button" onClick={() => navigate('/admin/categories')}>
              Cancel
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
