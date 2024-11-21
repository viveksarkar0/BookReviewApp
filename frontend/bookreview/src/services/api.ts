import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-66r2.onrender.com/api', // Replace with your backend URL
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
