import React, { useEffect, useState } from 'react'
import { getAllTags, createTag, updateTag, deleteTag } from '../../../services/tagService'

export default function TagList() {
  const [tags, setTags] = useState([])
  const [name, setName] = useState('')
  const [editId, setEditId] = useState(null)
  const [editName, setEditName] = useState('')

  const fetch = async () => {
    const { data } = await getAllTags()
    setTags(data)
  }

  useEffect(() => { fetch() }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!name.trim()) return
    await createTag({ name })
    setName('')
    fetch()
  }

  const handleUpdate = async (id) => {
    if (!editName.trim()) return
    await updateTag(id, { name: editName })
    setEditId(null)
    setEditName('')
    fetch()
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this tag?')) return
    await deleteTag(id)
    fetch()
  }

  return (
    <div className="admin-page">
      <section className="admin-card">
        <div className="admin-page-header">
          <div>
            <h2>Tags</h2>
            <p className="admin-subtitle">Create and refine short labels used across your catalog.</p>
          </div>
        </div>

        <form onSubmit={handleCreate} className="admin-inline-form" style={{ marginTop: '18px' }}>
          <input
            className="admin-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="New tag name"
          />
          <button className="admin-btn" type="submit">Add Tag</button>
        </form>
      </section>

      <section className="admin-table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tags.length === 0 && (
              <tr>
                <td colSpan="2" className="admin-empty">No tags yet.</td>
              </tr>
            )}
            {tags.map((tag) => (
              <tr key={tag._id}>
                <td>
                  {editId === tag._id ? (
                    <input
                      className="admin-input"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  ) : (
                    tag.name
                  )}
                </td>
                <td>
                  <div className="admin-table-actions">
                    {editId === tag._id ? (
                      <>
                        <button className="admin-btn-success" onClick={() => handleUpdate(tag._id)}>Save</button>
                        <button className="admin-btn-ghost" onClick={() => setEditId(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button
                          className="admin-btn-secondary"
                          onClick={() => {
                            setEditId(tag._id)
                            setEditName(tag.name)
                          }}
                        >
                          Edit
                        </button>
                        <button className="admin-btn-danger" onClick={() => handleDelete(tag._id)}>Delete</button>
                      </>
                    )}
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
