import React, { useEffect, useState } from 'react'
import { getAllMessages, markRead, deleteMessage } from '../../../services/contactService'

export default function MessageList() {
  const [messages, setMessages] = useState([])

  const fetch = async () => {
    const { data } = await getAllMessages()
    setMessages(data)
  }

  useEffect(() => { fetch() }, [])

  const handleMarkRead = async (id) => {
    await markRead(id)
    fetch()
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return
    await deleteMessage(id)
    fetch()
  }

  return (
    <div className="admin-page">
      <section className="admin-page-header">
        <div>
          <h2>Messages</h2>
          <p className="admin-subtitle">Track new inquiries and keep the customer inbox under control.</p>
        </div>
      </section>

      <section className="admin-table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.length === 0 && (
              <tr>
                <td colSpan="6" className="admin-empty">No messages yet.</td>
              </tr>
            )}
            {messages.map((msg) => (
              <tr key={msg._id} className={msg.is_read ? '' : 'admin-row-unread'}>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td className="admin-message-cell">{msg.message}</td>
                <td>{new Date(msg.createdAt).toLocaleDateString()}</td>
                <td>
                  <span className={msg.is_read ? 'admin-badge-muted' : 'admin-badge-warning'}>
                    {msg.is_read ? 'Read' : 'New'}
                  </span>
                </td>
                <td>
                  <div className="admin-table-actions">
                    {!msg.is_read && (
                      <button className="admin-btn-success" onClick={() => handleMarkRead(msg._id)}>Mark Read</button>
                    )}
                    <button className="admin-btn-danger" onClick={() => handleDelete(msg._id)}>Delete</button>
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
