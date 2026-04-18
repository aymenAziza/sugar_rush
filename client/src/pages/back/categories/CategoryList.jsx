import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllCategories, deleteCategory } from '../../../services/categoryService'

export default function CategoryList() {
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()

  const fetch = async () => {
    const { data } = await getAllCategories()
    setCategories(data)
  }

  useEffect(() => { fetch() }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category?')) return
    await deleteCategory(id)
    fetch()
  }

  return (
    <div className="admin-page">
      <section className="admin-page-header">
        <div>
          <h2>Categories</h2>
          <p className="admin-subtitle">Shape the storefront structure with strong collection groupings.</p>
        </div>
        <button className="admin-btn" onClick={() => navigate('/admin/categories/new')}>Add Category</button>
      </section>

      <section className="admin-table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 && (
              <tr>
                <td colSpan="4" className="admin-empty">No categories yet.</td>
              </tr>
            )}
            {categories.map((cat) => (
              <tr key={cat._id}>
                <td><img src={cat.image} alt={cat.name} className="admin-thumb" /></td>
                <td>{cat.name}</td>
                <td>{cat.slug}</td>
                <td>
                  <div className="admin-table-actions">
                    <button className="admin-btn-secondary" onClick={() => navigate(`/admin/categories/edit/${cat._id}`)}>Edit</button>
                    <button className="admin-btn-danger" onClick={() => handleDelete(cat._id)}>Delete</button>
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
