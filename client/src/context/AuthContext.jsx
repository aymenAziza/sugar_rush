import React, { createContext, useContext, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem('admin')) || null)
  const [token, setToken] = useState(localStorage.getItem('token') || null)

  const login = async (email, password) => {
    const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password })
    setAdmin(data.admin)
    setToken(data.token)
    localStorage.setItem('admin', JSON.stringify(data.admin))
    localStorage.setItem('token', data.token)
  }

  const logout = () => {
    setAdmin(null)
    setToken(null)
    localStorage.removeItem('admin')
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ admin, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)