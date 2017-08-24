import mongoose from 'mongoose';
import User from '../../app/models/user';

const users = [
  {
    email: 'ga@pis.com',
    password: '12345678'
  },
  {
    email: 'mi@pis.com',
    password: '12345678'
  },
  {
    email: 'bg@pis.com',
    password: '12345678'
  }
];

// Connect to MongoDB
mongoose.connect('mongodb://localhost/quizzy-backend');

// Go through each movie
users.map(data => {
  // Initialize a model with movie data
  const user = new User(data);
  // and save it into the database
  user.save();
});
