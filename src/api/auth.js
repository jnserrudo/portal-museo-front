const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const TOKEN_KEY = 'authToken';

export const AUTH_EXPIRED_EVENT = 'auth:expired';

const authUrl = (path) => {
  const base = API_BASE_URL.endsWith('/api') ? API_BASE_URL : `${API_BASE_URL}/api`;
  return `${base}/auth/${path}`;
};

const tokenExpiry = (token) => {
  try {
    const payload = token.split('.')[0].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(payload)).exp || 0;
  } catch {
    return 0;
  }
};

export const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;
  if (tokenExpiry(token) <= Date.now()) {
    localStorage.removeItem(TOKEN_KEY);
    return null;
  }
  return token;
};

export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

export const authHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const handleUnauthorized = () => {
  clearToken();
  window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT));
};

/** @returns {Promise<boolean>} true si la contraseña es correcta */
export const loginRequest = async (password) => {
  const response = await fetch(authUrl('login'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ password }),
  });

  if (response.status === 401) return false;
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || `Error al iniciar sesión (${response.status})`);
  }

  const { token } = await response.json();
  localStorage.setItem(TOKEN_KEY, token);
  return true;
};

/** @returns {Promise<boolean>} false solo si el servidor rechaza el token */
export const verifySession = async () => {
  const token = getToken();
  if (!token) return false;
  try {
    const response = await fetch(authUrl('verify'), { headers: authHeaders() });
    if (response.status === 401) {
      clearToken();
      return false;
    }
    return true;
  } catch {
    return true;
  }
};
