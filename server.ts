// Import the 'express' module
import express from 'express';
import sequelize from './config/mysql';

const app = express();


const port = 3000;

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
// Define a route for the root path ('/')
app.get('/', (req, res) => {
  // Send a response to the client
  res.send('Hello, setting project in typescript!');
});

// Starting the server and listening on the specified port
app.listen(port, () => {
  
  console.log(`Server is running on http://localhost:${port}`);
});