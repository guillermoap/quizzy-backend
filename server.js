import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import users from './config/routes/users';
import games from './config/routes/games';

// Connect to MongoDB
mongoose.connect('mongodb://localhost/quizzy-backend');

// Initialize http server
const app = express();

// Prettify JSON
app.set('json spaces', 3);

// Logger that outputs all requests into the console
app.use(morgan('combined'));

//Middleware to set the general routing
app.use('/users', users);
app.use('/games',games);

const server = app.listen(3000, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});
