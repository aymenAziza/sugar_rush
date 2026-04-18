import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createCookie, getCookie, updateCookie } from '../../../services/cookieService'
import { getAllCategories } from '../../../services/categoryService'
import { getAllTags } from '../../../services/tagService'

export default function CookieForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    ingredients: '',
    category: '',
    tags: [],
    is_available: true,
    is_featured: false,
  })
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [bootstrapping, setBootstrapping] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      setBootstrapping(true)
      try {
        const [{ data: categoryData }, { data: tagData }] = await Promise.all([
          getAllCategories(),
          getAllTags(),
        ])

        setCategories(categoryData)
        setTags(tagData)

        if (isEdit) {
          const { data } = await getCookie(id)
          setForm({
            name: data.name || '',
            description: data.description || '',
            price: data.price || '',
            ingredients: Array.isArray(data.ingredients) ? data.ingredients.join(', ') : '',
            category: data.category?._id || data.category || '',
            tags: Array.isArray(data.tags) ? data.tags.map((tag) => tag._id || tag) : [],
            is_available: Boolean(data.is_available),
            is_featured: Boolean(data.is_featured),
          })
          setPreview(data.image || '')
        }
      } catch {
        setError('Could not load form data')
      } finally {
        setBootstrapping(false)
      }
    }

    load()
  }, [id, isEdit])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleTagChange = (tagId) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tagId)
        ? prev.tags.filter((id) => id !== tagId)
        : [...prev.tags, tagId],
    }))
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
      formData.append('name', form.name)
      formData.append('description', form.description)
      formData.append('price', form.price)
      formData.append('ingredients', JSON.stringify(
        form.ingredients
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean)
      ))
      formData.append('category', form.category)
      formData.append('tags', JSON.stringify(form.tags))
      formData.append('is_available', form.is_available)
      formData.append('is_featured', form.is_featured)
      if (image) formData.append('image', image)

      if (isEdit) await updateCookie(id, formData)
      else await createCookie(formData)

      navigate('/admin/cookies')
    } catch {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-page">
      <section className="admin-form-card admin-form-card-wide">
        <h2>{isEdit ? 'Edit Cookie' : 'Add Cookie'}</h2>
        <p className="admin-subtitle">Create polished product entries for the catalog, including ingredients and taxonomy.</p>
        {bootstrapping && <p className="admin-subtitle">Loading form options...</p>}
        {error && <p className="admin-error">{error}</p>}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="admin-field-grid">
            <div className="admin-field">
              <label>Name</label>
              <input className="admin-input" name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="admin-field">
              <label>Price (TND)</label>
              <input className="admin-input" name="price" type="number" value={form.price} onChange={handleChange} required />
            </div>
          </div>

          <div className="admin-field">
            <label>Description</label>
            <textarea className="admin-textarea" name="description" value={form.description} onChange={handleChange} />
          </div>

          <div className="admin-field">
            <label>Ingredients</label>
            <textarea
              className="admin-textarea"
              name="ingredients"
              value={form.ingredients}
              onChange={handleChange}
              placeholder="Chocolate, butter, vanilla, sea salt"
            />
          </div>

          <div className="admin-field-grid">
            <div className="admin-field">
              <label>Category</label>
              <select className="admin-input" name="category" value={form.category} onChange={handleChange}>
                <option value="">No category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div className="admin-field">
              <label>Tags</label>
              <div className="admin-tag-grid">
                {tags.map((tag) => (
                  <label key={tag._id} className="admin-checkbox">
                    <input
                      type="checkbox"
                      checked={form.tags.includes(tag._id)}
                      onChange={() => handleTagChange(tag._id)}
                    />
                    {tag.name}
                  </label>
                ))}
                {tags.length === 0 && <p className="admin-subtitle">No tags yet.</p>}
              </div>
            </div>
          </div>

          <div className="admin-field">
            <label>Image</label>
            <input className="admin-file" type="file" accept="image/*" onChange={handleImage} />
            {preview && <img src={preview} alt="preview" className="admin-preview" />}
          </div>

          <div className="admin-checkbox-row">
            <label className="admin-checkbox">
              <input type="checkbox" name="is_available" checked={form.is_available} onChange={handleChange} />
              Available
            </label>
            <label className="admin-checkbox">
              <input type="checkbox" name="is_featured" checked={form.is_featured} onChange={handleChange} />
              Featured
            </label>
          </div>

          <div className="admin-form-actions">
            <button className="admin-btn" type="submit" disabled={loading || bootstrapping}>
              {loading ? 'Saving...' : isEdit ? 'Update Cookie' : 'Create Cookie'}
            </button>
            <button className="admin-btn-ghost" type="button" onClick={() => navigate('/admin/cookies')}>
              Cancel
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
