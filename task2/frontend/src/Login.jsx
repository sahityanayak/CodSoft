// Login.jsx
import React, { useState } from 'react';
import './style.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleLogin = () => {
    if (username && password && role) {
      onLogin({ username, role });
    } else {
      alert('Please enter username, password, and select a role.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <label>Username:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <br />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <label>Role:</label>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="employer">Employer</option>
        <option value="candidate">Candidate</option>
      </select>
      <br />
      <button onClick={handleLogin}>Login</button>

      <p>Don't have an account? <a href="/signup">Create Account</a></p>
    </div>
  );
};

export default Login;
