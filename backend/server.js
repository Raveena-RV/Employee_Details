const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.json());

dotenv.config();
// Load environment variables
console.log(
  process.env.HOST,
  process.env.USER,
  process.env.PASSWORD,
  process.env.DATABASE
);
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// MySQL connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err.message);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.post('/submit', (req, res) => {
  const {
    name,
    employeeId,
    department,
    city,
    dob,
    gender,
    designation,
    salary,
  } = req.body;

  const sql = `INSERT INTO employees (name, employee_id, department, city, dob, gender, designation, salary)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [name, employeeId, department, city, dob, gender, designation, salary],
    (err, results) => {
      if (err) {
        console.error('Error inserting into database:', err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
      } else {
        console.log('Employee added successfully!');
        res.json({ message: 'Employee added successfully!' });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
