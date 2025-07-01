import axios from 'axios';
import authService from './auth';

const api = axios.create({
  baseURL: 'http://localhost:8000/',
});

// Add token to every request if available
api.interceptors.request.use((config) => {
  const token = authService.getToken();
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;