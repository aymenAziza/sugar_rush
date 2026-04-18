import axios from 'axios'

const API = 'http://localhost:5000/api/contact'
const getToken = () => localStorage.getItem('token')

export const getAllMessages = () => axios.get(API, {
  headers: { Authorization: `Bearer ${getToken()}` }
})
export const sendMessage = (data) => axios.post(API, data)
export const markRead = (id) => axios.put(`${API}/${id}/read`, {}, {
  headers: { Authorization: `Bearer ${getToken()}` }
})
export const deleteMessage = (id) => axios.delete(`${API}/${id}`, {
  headers: { Authorization: `Bearer ${getToken()}` }
})