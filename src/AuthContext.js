// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const parseJSON = (data) => {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return null;
    }
  };

  const [isAuthenticated, setAuthenticated] = useState(() => {
    const storedAuthState = localStorage.getItem('isAuthenticated');
    return storedAuthState ? parseJSON(storedAuthState) : false;
  });

  const [userData, setUserData] = useState(() => {
    const storedUserData = localStorage.getItem('userData');
    return storedUserData ? parseJSON(storedUserData) : null;
  });

  useEffect(() => {
    // Store the authentication state in localStorage
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));

    // Store user data in localStorage whenever it changes
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [isAuthenticated, userData]);

  const login = (userData) => {
    setAuthenticated(true);
    setUserData(userData);
  };

  const logout = () => {
    setAuthenticated(false);
    setUserData(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
