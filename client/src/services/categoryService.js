import axios from 'axios'

const API = 'http://localhost:5000/api/categories'
const getToken = () => localStorage.getItem('token')

export const getAllCategories = () => axios.get(API)
export const getCategory = (id) => axios.get(`${API}/${id}`)
export const createCategory = (formData) => axios.post(API, formData, {
  headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'multipart/form-data' }
})
export const updateCategory = (id, formData) => axios.put(`${API}/${id}`, formData, {
  headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'multipart/form-data' }
})
export const deleteCategory = (id) => axios.delete(`${API}/${id}`, {
  headers: { Authorization: `Bearer ${getToken()}` }
})