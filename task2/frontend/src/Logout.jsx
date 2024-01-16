// Logout.jsx
import React from 'react';
import './style.css';

const Logout = ({ onLogout }) => {
  const handleLogout = () => {
    
    onLogout();
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
