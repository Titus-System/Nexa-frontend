import { createContext } from 'react';

// Tipos para o contexto de autenticação
export interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
