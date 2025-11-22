import { createContext } from 'react';

export interface User {
  id: number;
  name: string;
  email: string;
  role_name?: string;
}

// Tipos para o contexto de autenticação
export interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
