const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'job_db',
});

app.get('/', (req, res) => {
  return res.json('From Backend side');
});

app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';

  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post('/users', (req, res) => {
  const { username, email, password, role } = req.body;

  const sql = 'INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)';
  const values = [username, email, password, role];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error adding user to the database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('User added to the database');
     
      const insertedUser = { user_id: result.insertId, ...req.body };
      res.json(insertedUser);
    }
  });
});

app.delete('/users/:userId', (req, res) => {
  const userId = req.params.userId;

  console.log('Received DELETE request for user with ID:', userId);

  const sql = 'DELETE FROM users WHERE user_id = ?';
  const values = [userId];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error deleting user from the database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('User deleted from the database');
      res.json({ message: 'User deleted successfully' });
    }
  });
});

app.get('/jobs', (req, res) => {
  const sql = 'SELECT * FROM jobs';

  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.post('/jobs', (req, res) => {
    const { title, description, location, salary } = req.body;
  
    const sql = 'INSERT INTO jobs (title, description, location, salary) VALUES (?, ?, ?, ?)';
    const values = [title, description, location, salary];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error adding job to the database:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log('Job added to the database');
        // Send the inserted job data back to the client
        const insertedJob = { job_id: result.insertId, ...req.body };
        res.json(insertedJob);
      }
    });
  });
  
  app.delete('/jobs/:jobId', (req, res) => {
    const jobId = req.params.jobId;
  
    console.log('Received DELETE request for job with ID:', jobId);
  
    const sql = 'DELETE FROM jobs WHERE job_id = ?';
    const values = [jobId];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error deleting job from the database:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log('Job deleted from the database');
        res.json({ message: 'Job deleted successfully' });
      }
    });
  });
app.get('/applications', (req, res) => {
  const sql = 'SELECT * FROM applications';

  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.post('/applications', (req, res) => {
    const { job_id, candidate_id, resume_filename } = req.body;
  
    const sql = 'INSERT INTO applications (job_id, candidate_id, resume_filename) VALUES (?, ?, ?)';
    const values = [job_id, candidate_id, resume_filename];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error adding application to the database:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log('Application added to the database');
        // Send the inserted application data back to the client
        const insertedApplication = { application_id: result.insertId, ...req.body };
        res.json(insertedApplication);
      }
    });
  });
  
  app.delete('/applications/:applicationId', (req, res) => {
    const applicationId = req.params.applicationId;
  
    console.log('Received DELETE request for application with ID:', applicationId);
  
    const sql = 'DELETE FROM applications WHERE application_id = ?';
    const values = [applicationId];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error deleting application from the database:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log('Application deleted from the database');
        res.json({ message: 'Application deleted successfully' });
      }
    });
  });
  app.get('/jobs', (req, res) => {
    const { searchTerm } = req.query;
  
    // If searchTerm is provided, perform a search
    if (searchTerm) {
      const searchSql = 'SELECT * FROM jobs WHERE title LIKE ?';
      const searchValue = `%${searchTerm}%`;
  
      db.query(searchSql, [searchValue], (err, searchData) => {
        if (err) return res.json(err);
        return res.json(searchData);
      });
    } else {
      // If searchTerm is not provided, fetch all jobs
      const sql = 'SELECT * FROM jobs';
      db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
      });
    }
  });
  // Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM users WHERE username = ? AND password_hash = ?';
    const values = [username, password];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error in login:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        if (result.length > 0) {
          // User authenticated successfully
          res.json({ message: 'Login successful', user: result[0] });
        } else {
          // Authentication failed
          res.status(401).json({ error: 'Invalid username or password' });
        }
      }
    });
  });
  
  // Logout route 
  app.post('/logout', (req, res) => {
    
    res.json({ message: 'Logout successful' });
  });
app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
