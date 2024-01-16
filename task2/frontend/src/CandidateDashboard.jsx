// CandidateDashboard.jsx
import React, { useState, useEffect } from 'react';
import './app.css';

const CandidateDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [newApplication, setNewApplication] = useState({
    job_id: '',
    candidate_id: '',
    resume_filename: '', // File upload for resume
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Fetch applications data from your API endpoint
    fetch('http://localhost:8080/applications')  // Adjust the API endpoint based on your server setup
      .then((res) => res.json())
      .then((data) => setApplications(data))
      .catch((error) => console.error('Error fetching applications:', error));
  }, []);

  const handleInputChange = (e) => {
    setNewApplication({
      ...newApplication,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddApplication = () => {
    fetch('http://localhost:8080/applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newApplication),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('Application added successfully:', data);
        setApplications([...applications, data]);
        setNewApplication({
          job_id: '',
          candidate_id: '',
          resume_filename: '',
        });
        setSuccessMessage('Application added successfully!');
      })
      .catch((error) => {
        console.error('Error adding application:', error);
      });
  };

  const handleDeleteApplication = (applicationId) => {
    console.log('Deleting application with ID:', applicationId);

    // Make a DELETE request to delete the application
    fetch(`http://localhost:8080/applications/${applicationId}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(() => {
        console.log('Application deleted successfully:', applicationId);
        setApplications(applications.filter((app) => app.application_id !== applicationId));
      })
      .catch((error) => {
        console.error('Error deleting application:', error);
      });
  };

  const handleUpdateApplication = (applicationId) => {
    // Implement logic to update application details in the database
    console.log('Update Application:', applicationId);
    // Make a PUT request to your backend to update the application
  };

  return (
    <div className='dashboard-container'>
      <h2>Candidate Dashboard</h2>

      {/* Add Application Section */}
      <div className='candidate-section'>
        <h3>Add Application</h3>
        <input
          type="text"
          placeholder="Job ID"
          name="job_id"
          value={newApplication.job_id}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Candidate_id"
          name="candidate_id"
          value={newApplication.candidate_id}
          onChange={handleInputChange}
        />
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          name="resume-filename"
          onChange={(e) => setNewApplication({ ...newApplication, resume_filename: e.target.files[0] })}
        />
        <button onClick={handleAddApplication}>Apply</button>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </div>

      {/* Application Management Section */}
      <div>
        <h3>Application Management</h3>
        {/* Display a list of applications from your database */}
        <table>
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Job ID</th>
              <th>Candidate_id</th>
              <th>Resume</th>
              
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.application_id}>
                <td>{application.application_id}</td>
                <td>{application.job_id}</td>
                <td>{application.candidate_id}</td>
                <td>{application.resume_filename}</td>
                <td>
                  <button onClick={() => handleUpdateApplication(application.application_id)}>Update</button>
                  <button onClick={() => handleDeleteApplication(application.application_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add more sections and functionalities as needed */}
    </div>
  );
};

export default CandidateDashboard;
