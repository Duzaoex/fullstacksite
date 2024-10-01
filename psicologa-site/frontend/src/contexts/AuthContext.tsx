import React, { createContext } from 'react';
import { login as loginService } from '../services/api';

interface AuthContextType {
  login: (username: string, password: string) => Promise<void>;
  // Adicione mais métodos, como logout, se necessário
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const login = async (username: string, password: string) => {
    const data = await loginService(username, password);
    localStorage.setItem('token', data.token);
  };

  return (
    <AuthContext.Provider value={{ login }}>
      {children}
    </AuthContext.Provider>
  );
};
