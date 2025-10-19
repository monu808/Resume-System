import axios from 'axios';

// Use relative URL in production (Vercel), localhost in development
const API_URL = import.meta.env.VITE_API_URL || 
                (import.meta.env.PROD ? '' : 'http://localhost:5000');

// Debug: Log the API URL and environment
console.log('🔧 API Configuration:', {
  API_URL,
  VITE_API_URL: import.meta.env.VITE_API_URL,
  PROD: import.meta.env.PROD,
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV
});

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/api/auth/register', data),
  login: (data) => api.post('/api/auth/login', data),
  getMe: () => api.get('/api/auth/me'),
};

// Resume APIs
export const resumeAPI = {
  generateSummary: (data) => api.post('/api/generate-summary', data),
  saveResume: (data) => api.post('/api/save-resume', data),
  getResume: (userId) => api.get(`/api/resume/${userId}`),
  getMyResume: () => api.get('/api/resume'),
  deleteResume: () => api.delete('/api/resume'),
};

// Integration APIs
export const integrationAPI = {
  syncCoursera: (apiKey) => api.get('/api/integrations/coursera', { params: { apiKey } }),
  syncGitHub: (username) => api.get('/api/integrations/github', { params: { username } }),
  syncDevfolio: (username) => api.get('/api/integrations/devfolio', { params: { username } }),
  syncAll: () => api.post('/api/integrations/sync-all'),
  getData: () => api.get('/api/integrations/data'),
  deleteData: (id) => api.delete(`/api/integrations/data/${id}`),
};

// Admin APIs
export const adminAPI = {
  clearMyData: () => api.delete('/api/admin/clear-my-data'),
  clearAllData: () => api.delete('/api/admin/clear-all-data'),
};

export default api;
