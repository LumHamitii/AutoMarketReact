import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(() => {
    // Check localStorage or sessionStorage for the authentication state
    const storedAuthState = localStorage.getItem('isAuthenticated');
    return storedAuthState ? JSON.parse(storedAuthState) : false;
  });

  useEffect(() => {
    // Store the authentication state in localStorage or sessionStorage
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const login = () => setAuthenticated(true);
  const logout = () => setAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
