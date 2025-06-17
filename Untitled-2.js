// JWT处理工具.js
import axios from 'axios';

export function setupAxiosInterceptors() {
  axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 401) {
        // 处理token过期
      }
      return Promise.reject(error);
    }
  );
}