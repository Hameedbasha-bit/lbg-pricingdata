import express from 'express';
import { createConnection } from 'mysql';

const app = express();
const port = 3000;

// MySQL connection configuration
const connection = createConnection({
  host: 'YOUR_PUBLIC_IP_ADDRESS', // Replace with your GCP MySQL instance public IP address
  user: 'user',
  password: 'user',
  database: 'mysql-pricing',
  connectTimeout: 20000 // 20 seconds
});

// Connect to MySQL
connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// GET API to fetch data from mrtg_loan_tbl
app.get('/api/loans', (req, res) => {
  const query = 'SELECT * FROM mrtg_loan_tbl';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results);
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
