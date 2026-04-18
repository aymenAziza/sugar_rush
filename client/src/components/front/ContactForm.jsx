import React, { useState } from 'react'
import { sendMessage } from '../../services/contactService'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState({ error: '', success: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ error: '', success: '' })

    try {
      await sendMessage(form)
      setForm({ name: '', email: '', message: '' })
      setStatus({ error: '', success: 'Your message was sent successfully.' })
    } catch {
      setStatus({ error: 'Something went wrong while sending your message.', success: '' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="front-form-shell">
      <form className="front-form" onSubmit={handleSubmit}>
        <input className="front-input" name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
        <input className="front-input" name="email" type="email" placeholder="Email address" value={form.email} onChange={handleChange} required />
        <textarea className="front-textarea" name="message" rows="6" placeholder="Tell us what you need" value={form.message} onChange={handleChange} required />
        {status.error && <p className="admin-error">{status.error}</p>}
        {status.success && <p className="admin-success-text">{status.success}</p>}
        <button className="front-btn" type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  )
}
