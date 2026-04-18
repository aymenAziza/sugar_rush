import axios from 'axios'

const API = 'http://localhost:5000/api/home-content'
const getToken = () => localStorage.getItem('token')

export const getHomeContent = () => axios.get(API)

export const updateHomeContent = (data) => axios.put(API, data, {
  headers: { Authorization: `Bearer ${getToken()}` }
})
