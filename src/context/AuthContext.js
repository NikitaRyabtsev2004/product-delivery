import React, { createContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, resetPassword as apiResetPassword } from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse user data', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await apiLogin(email, password);
    if (response.success) {
      const userData = {
        id: response.user.id,
        email: response.user.email,
        name: response.user.name,
        token: response.user.token
      };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, message: response.message };
  };

  const register = async (email, password, name) => {
    const response = await apiRegister(email, password, name);
    if (response.success) {
      const userData = {
        id: response.user.id,
        email: response.user.email,
        name: response.user.name,
        token: response.user.token
      };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, message: response.message };
  };

  const resetPassword = async (email, newPassword) => {
    return await apiResetPassword(email, newPassword);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem(`cart_${user?.id}`);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      loading,
      login, 
      register, 
      resetPassword, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};