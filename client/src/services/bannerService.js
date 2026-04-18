import axios from 'axios'

const API = 'http://localhost:5000/api/banners'
const getToken = () => localStorage.getItem('token')

export const getAllBanners = () => axios.get(API)
export const createBanner = (formData) => axios.post(API, formData, {
  headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'multipart/form-data' }
})
export const updateBanner = (id, formData) => axios.put(`${API}/${id}`, formData, {
  headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'multipart/form-data' }
})
export const deleteBanner = (id) => axios.delete(`${API}/${id}`, {
  headers: { Authorization: `Bearer ${getToken()}` }
})