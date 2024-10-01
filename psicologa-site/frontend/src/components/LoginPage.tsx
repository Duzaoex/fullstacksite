import React, { useState } from 'react';

interface LoginPageProps {
  onLogin: (username: string, password: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null); // Para mensagens de erro
  const [isLoading, setIsLoading] = useState<boolean>(false); // Para gerenciar o estado de carregamento

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Resetar erro antes de tentar o login
    setIsLoading(true); // Indicar que o login está em andamento

    try {
      await onLogin(username, password); // Chama a função onLogin
    } catch (error) {
      console.error(error); // Adicione isso para evitar o erro do ESLint
      setError('Usuário ou senha incorretos.'); // Exibir erro caso a autenticação falhe
    } finally {
      setIsLoading(false); // Resetar estado de carregamento
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Usuário</label>
          <input 
            id="username"
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input 
            id="password"
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
