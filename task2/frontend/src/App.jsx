// App.jsx
import React, { useState, useEffect } from 'react';
import EmployerDashboard from './EmployerDashboard';
import AdminDashboard from './AdminDashboard'; 
import CandidateDashboard from './CandidateDashboard';
import JobListings from './JobListings';
import Login from './Login';
import Logout from './Logout';
import './app.css'; 

function App() {
  const [jobListings, setJobListings] = useState([]);
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch job listings data from API endpoint
    fetch('http://localhost:8080/jobs')
      .then((res) => res.json())
      .then((data) => setJobListings(data))
      .catch((error) => console.error('Error fetching job listings:', error));

    // Fetch applications data from API endpoint
    fetch('http://localhost:8080/applications')
      .then((res) => res.json())
      .then((data) => setApplications(data))
      .catch((error) => console.error('Error fetching applications:', error));
  }, []);

  const handleSearch = () => {
    const filteredJobs = jobListings.filter((job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setJobListings(filteredJobs);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="container">
      <h1>Welcome to our Job Board!</h1>
      <p>Explore exciting job opportunities and find your dream job.</p>

      {user ? (
        <div>
          <div className="user-info"> 
            <p>Welcome, {user.username} ({user.role})!</p>
            <Logout onLogout={handleLogout} />
          </div>

          

          <div className="search-bar"> 
            <label>Search Jobs:</label>
            <input type="text" className="search-input" value={searchTerm} onChange={handleInputChange} />
            <button className="search-button" onClick={handleSearch}>Search</button>
          </div>


          {user.role === 'admin' && <AdminDashboard />}
          {user.role === 'employer' && <EmployerDashboard />}
          {user.role === 'candidate' && <CandidateDashboard />}
          
          <div className="job-listings"> 
            <h2>Job Listings</h2>
            <JobListings jobListings={jobListings} />
          </div>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
