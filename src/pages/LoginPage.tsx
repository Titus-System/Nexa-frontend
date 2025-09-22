import React from 'react';
import { useAuth } from '../context/useAuth';

const LoginPage: React.FC = () => {
  const { login } = useAuth();

  // Placeholder para futura implementação de formulário de login
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '4rem' }}>
      <h2>Login</h2>
      <p>Funcionalidade de login será implementada em breve.</p>
      <button onClick={login}>Entrar (placeholder)</button>
    </div>
  );
};

export default LoginPage;
