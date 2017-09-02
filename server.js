import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import users from './config/routes/users.js';
import configuration from './config/config.js';

var env = process.env.NODE_ENV || 'development';
var config = configuration[env];

// Connect to MongoDB
mongoose.connect(`mongodb://${config.database.host}/${config.database.db}`);

// Initialize http server
const app = express();

// Prettify JSON
app.set('json spaces', 3);

// Logger that outputs all requests into the console
if ((env != 'test') && (env != 'prodTest')) {
  app.use(morgan('combined'));
}

//Middleware to set the general routing
app.use('/users', users);

const server = app.listen(config.server.port, config.server.host, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});

export default app;
