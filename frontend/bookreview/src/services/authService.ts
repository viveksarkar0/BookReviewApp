
import api from './api';


export const register = async (userData: any) => {
  const response = await api.post('/auth/register', userData);
  const { token } = response.data; 
  if (token) {
    localStorage.setItem('token', token);
  }
  return response;
};

// Login a user
export const login = async (credentials: any) => {
  const response = await api.post('/auth/login', credentials);
  const { token } = response.data;
  if (token) {
    localStorage.setItem('token', token);
  }
  return response;
};



