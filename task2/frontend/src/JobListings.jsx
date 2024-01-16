// JobListings.jsx
import React from 'react';

const JobListings = ({ jobListings }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Location</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {jobListings.map((job) => (
            <tr key={job.job_id}>
              <td>{job.title}</td>
              <td>{job.description}</td>
              <td>{job.location}</td>
              <td>${job.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobListings;
