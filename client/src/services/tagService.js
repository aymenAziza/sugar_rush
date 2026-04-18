import axios from 'axios'

const API = 'http://localhost:5000/api/tags'
const getToken = () => localStorage.getItem('token')

export const getAllTags = () => axios.get(API)
export const createTag = (data) => axios.post(API, data, {
  headers: { Authorization: `Bearer ${getToken()}` }
})
export const updateTag = (id, data) => axios.put(`${API}/${id}`, data, {
  headers: { Authorization: `Bearer ${getToken()}` }
})
export const deleteTag = (id) => axios.delete(`${API}/${id}`, {
  headers: { Authorization: `Bearer ${getToken()}` }
})