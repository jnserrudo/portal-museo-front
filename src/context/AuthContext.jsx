import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar si el usuario ya está autenticado al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Aquí podrías validar el token con el backend si es necesario
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (password) => {
    try {
      // Aquí iría la llamada al backend para autenticar
      // Por ahora, usamos una contraseña simple para la demo
      if (password === 'admin123') {
        // Simulamos un token de autenticación
        localStorage.setItem('authToken', 'dummy-token');
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error en el login:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

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
