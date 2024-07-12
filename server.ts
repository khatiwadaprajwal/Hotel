import express, { Application } from 'express';
import sequelize from './config/mysql';
import appRoutes from './routes/approute';

const app: Application = express();
const port = 3000;
import dotenv from 'dotenv';
dotenv.config();


// Middleware for JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes setup
app.use('/v1', appRoutes);

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
