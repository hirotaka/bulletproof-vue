import Axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

// Type definitions for API errors
export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

// Request interceptor to add authentication headers and credentials
function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json';
  }

  config.withCredentials = true;
  return config;
}

// Create Axios instance with base configuration
export const api = Axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL || 'http://localhost:8080/api',
});

// Add request interceptor
api.interceptors.request.use(authRequestInterceptor);

// Add response interceptor
api.interceptors.response.use(
  (response) => {
    // Automatically unwrap response data
    return response.data;
  },
  (error: AxiosError<ApiError>) => {
    const message = error.response?.data?.message || error.message;

    // TODO: Add notification system integration (Task 1.2.x)
    // This will be implemented after the notifications store is created
    console.error('API Error:', message);

    // Handle 401 Unauthorized - redirect to login
    if (error.response?.status === 401) {
      // TODO: Add proper path configuration (Task 1.3.x)
      // This will use the paths config once it's created
      const currentPath = window.location.pathname;
      const redirectTo = currentPath !== '/' ? `?redirectTo=${encodeURIComponent(currentPath)}` : '';
      window.location.href = `/auth/login${redirectTo}`;
    }

    return Promise.reject(error);
  },
);
