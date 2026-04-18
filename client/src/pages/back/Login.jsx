import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/admin/dashboard')
    } catch {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-auth">
      <section className="admin-auth-showcase">
        <div className="admin-auth-copy">
          <p className="admin-brand-label" style={{ color: '#a16a47' }}>Sugar Rush</p>
          <h1>Run the shop with confidence.</h1>
          <p>
            Access your private workspace to update products, organize collections, manage banners, and follow customer messages.
          </p>
        </div>
      </section>

      <section className="admin-auth-panel">
        <div className="admin-form-card admin-auth-card">
          <h2>Admin Login</h2>
          <p className="admin-subtitle">Sign in to continue to the control center.</p>
          {error && <p className="admin-error">{error}</p>}
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="admin-field">
              <label>Email</label>
              <input
                className="admin-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="admin-field">
              <label>Password</label>
              <input
                className="admin-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="admin-btn" type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
