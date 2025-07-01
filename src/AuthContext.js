import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from './auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = authService.getToken();
      const storedUser = authService.getCurrentUser();
      
      if (token && storedUser) {
        try {
          // Verify token is still valid
          await authService.testToken();
          setUser(storedUser);
        } catch (error) {
          authService.logout();
        }
      }
      setLoading(false);
    };
    
    initializeAuth();
  }, []);

  const login = async (username, password) => {
    const data = await authService.login(username, password);
    setUser(data.user);
    return data;
  };

 const signup = async (username, email, password) => {
    try {
      const response = await authService.signup(username, email, password);
      setUser(response.user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);