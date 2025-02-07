import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any global request configurations
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handling

    // eslint-disable-next-line no-console
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;
