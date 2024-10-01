import React from 'react';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  return (
    <div>
      <h1>Painel de Controle</h1>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
