import axios from "axios"

const launApi = axios.create({
  baseURL: import.meta.env.VITE_LAUN_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
})

launApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("laun_token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default launApi
