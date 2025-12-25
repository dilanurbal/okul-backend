import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000', // Backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Token ekleme
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Error handling
axiosClient.interceptors.response.use(
  (response) => {
    // Backend'in response formatına göre ayarla
    // Eğer backend data içinde data döndürüyorsa: response.data.data
    // Eğer direkt data döndürüyorsa: response.data
    return response.data;
  },
  (error) => {
    // Unauthorized hatası
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // Error response'u formatla
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.error ||
                        error.message ||
                        'Bir hata oluştu';
    
    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosClient;