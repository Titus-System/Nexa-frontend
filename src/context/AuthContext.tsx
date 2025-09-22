import { useState } from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from './AuthContextValue';

// Provedor do contexto de autenticação
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Função de login (placeholder)
  const login = () => {
    // Implementar lógica de autenticação futuramente
    setIsAuthenticated(true);
  };

  // Função de logout (placeholder)
  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook customizado para acessar o contexto
// O hook useAuth foi movido para useAuth.ts
