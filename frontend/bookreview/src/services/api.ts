import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api', // Replace with your backend URL
});

// Add a token to the request if available (for protected routes)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
