const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/+$/, '');

// VITE_API_URL puede ser "/api" (produccion) o "http://localhost:3000" (desarrollo).
export const apiUrl = (path) => {
  const base = API_BASE_URL.endsWith('/api') ? API_BASE_URL : `${API_BASE_URL}/api`;
  return `${base}/${path.replace(/^\/+/, '')}`;
};
