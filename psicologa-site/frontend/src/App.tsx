import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import HomePage from './pages/HomePage';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';

const getToken = () => {
  return localStorage.getItem('token');
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Para mensagens de erro

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:3001/login', { username, password });
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      setErrorMessage(null); // Limpa a mensagem de erro em caso de sucesso
    } catch (error) {
      setErrorMessage('Erro ao fazer login. Verifique suas credenciais.'); // Mensagem de erro
      console.error('Erro ao fazer login:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Exibe a mensagem de erro */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage onLogin={handleLogin} />
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
