
// EmployerDashboard.jsx
import React, { useState, useEffect } from 'react';
import './app.css';

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Fetch jobs data from  API endpoint
    fetch('http://localhost:8080/jobs')  
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error('Error fetching jobs:', error));
  }, []);

  const handleInputChange = (e) => {
    setNewJob({
      ...newJob,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddJob = () => {
    fetch('http://localhost:8080/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJob),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('Job added successfully:', data);
        setJobs([...jobs, data]);
        setNewJob({
          title: '',
          description: '',
          location: '',
          salary: '',
        });
        setSuccessMessage('Job added successfully!');
      })
      .catch((error) => {
        console.error('Error adding job:', error);
      });
  };

 
  const handleUpdateJob = (jobId) => {
    
    console.log('Update Job:', jobId);
  
  };

  return (
    <div className='dashboard-container'>
      <h2>Employer Dashboard</h2>

      {/* Add Job Section */}
      <div className='employer-section'>
        <h3>Add Job</h3>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={newJob.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Description"
          name="description"
          value={newJob.description}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Location"
          name="location"
          value={newJob.location}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Salary"
          name="salary"
          value={newJob.salary}
          onChange={handleInputChange}
        />
        <button onClick={handleAddJob}>Add Job</button>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </div>

      {/* Job Management Section */}
      <div>
        <h3>Job Management</h3>
        {/* Display a list of jobs from your database */}
        <table>
          <thead>
            <tr>
              <th>Job ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Location</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.job_id}>
                <td>{job.job_id}</td>
                <td>{job.title}</td>
                <td>{job.description}</td>
                <td>{job.location}</td>
                <td>${job.salary}</td>
                <td>
                  <button onClick={() => handleUpdateJob(job.job_id)}>Update</button>
                  <button onClick={() => handleDeleteJob(job.job_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
    </div>
  );
};

export default EmployerDashboard;
