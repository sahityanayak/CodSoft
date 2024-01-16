// AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import './app.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Fetch users data from  API endpoint
    fetch('http://localhost:8080/users')  
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const handleInputChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddUser = () => {
    fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('User added successfully:', data);
        setUsers([...users, data]);
        setNewUser({
          username: '',
          email: '',
          password: '',
          role: '',
        });
        setSuccessMessage('User added successfully!');
      })
      .catch((error) => {
        console.error('Error adding user:', error);
      });
  };
  

  const handleDeleteUser = (userId) => {
    console.log('Deleting user with ID:', userId);
  
    // Make a DELETE request to delete the user
    fetch(`http://localhost:8080/users/${userId}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(() => {
        console.log('User deleted successfully:', userId);
        setUsers(users.filter((user) => user.user_id !== userId));
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };
  

  const handleUpdateUser = (userId) => {
    
    console.log('Update User:', userId);

  };

  return (
    <div className='dashboard-container'>
      <h2>Admin Dashboard</h2>

      {/* Add User Section */}
      <div className='admin-section'>
        <h3>Add User</h3>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={newUser.username}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={newUser.password}
          onChange={handleInputChange}
        />
        <select name="role" value={newUser.role} onChange={handleInputChange}>
          <option value="employer">Employer</option>
          <option value="candidate">Candidate</option>
        </select>
        <button onClick={handleAddUser}>Add User</button>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </div>

      {/* User Management Section */}
      <div>
        <h3>User Management</h3>
        {/* Display a list of users from your database */}
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userid}>
                <td>{user.user_id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleUpdateUser(user.userid)}>Update</button>
                  <button onClick={() => handleDeleteUser(user.userid)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AdminDashboard;
