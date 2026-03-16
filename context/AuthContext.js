import React, { createContext, useState, useContext } from "react";

// 1. Create the Context
const AuthContext = createContext();

// 2. Create the Provider
export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = (token) => {
    console.log("Logging in with tokennn:", token);
    setIsLoading(true);
    setUserToken(token); // Set this after successful JSON server check
    setIsLoading(false);
  };

  const logout = () => {
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{ userToken, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom hook for easy access
export const useAuth = () => useContext(AuthContext);
