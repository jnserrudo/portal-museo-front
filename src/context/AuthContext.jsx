import React, { createContext, useContext, useState, useEffect } from 'react';
import { AUTH_EXPIRED_EVENT, clearToken, getToken, loginRequest, verifySession } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(getToken()));

  // El token vigente habilita la sesión al instante; el servidor la confirma en segundo plano.
  useEffect(() => {
    if (!getToken()) return;
    verifySession().then((valid) => {
      if (!valid) setIsAuthenticated(false);
    });
  }, []);

  useEffect(() => {
    const onExpired = () => setIsAuthenticated(false);
    window.addEventListener(AUTH_EXPIRED_EVENT, onExpired);
    return () => window.removeEventListener(AUTH_EXPIRED_EVENT, onExpired);
  }, []);

  const login = async (password) => {
    const success = await loginRequest(password);
    if (success) setIsAuthenticated(true);
    return success;
  };

  const logout = () => {
    clearToken();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

export default AuthContext;
