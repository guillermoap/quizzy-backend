import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import users from './config/routes/users.js';
import home from './config/routes/home'
import path from 'path'

const STATIC_CONTENT = path.join(__dirname,'../quizzy-frontend/public');
const DB_URL         = 'mongodb://localhost/quizzy-backend';

// Connect to MongoDB
mongoose.connect(DB_URL);

// Initialize http server
const app = express();

// Prettify JSON
app.set('json spaces', 4);

// Logger that outputs all requests into the console
app.use(morgan('combined'));

// Middleware to set the general routing
app.use('/rest/users', users);

// Static
app.use('/public',express.static(STATIC_CONTENT));
// Index
app.use('/',home);

const server = app.listen(3000, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});
