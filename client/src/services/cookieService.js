import axios from 'axios'

const API = 'http://localhost:5000/api/cookies'

const getToken = () => localStorage.getItem('token')

export const getAllCookies = () => axios.get(API)

export const getCookie = (id) => axios.get(`${API}/${id}`)

export const createCookie = (formData) => axios.post(API, formData, {
  headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'multipart/form-data' }
})

export const updateCookie = (id, formData) => axios.put(`${API}/${id}`, formData, {
  headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'multipart/form-data' }
})

export const deleteCookie = (id) => axios.delete(`${API}/${id}`, {
  headers: { Authorization: `Bearer ${getToken()}` }
})