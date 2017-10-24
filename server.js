import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import configuration from './config/config.js';
import games from './config/routes/games';
import users from './config/routes/users.js';
import matches from './config/routes/matches.js';
import cors from 'cors';
import expressWs from 'express-ws'

var env = process.env.NODE_ENV || 'development';
var config = configuration[env];

// Connect to MongoDB
mongoose.connect(`mongodb://${config.database.host}/${config.database.db}`);

// Initialize http server
const app = express();
// Initialize Ws server
var eWs = expressWs(app)

// Prettify JSON
app.set('json spaces', 3);

// Logger that outputs all requests into the console
if ((env != 'test') && (env != 'prodTest')) {
  app.use(morgan('combined'));
}

// cors middleware to accept any pattern matching example.com subdomains
app.use(cors());
app.options('*',cors());

//Middleware to set the general routing
app.use('/users', users);
app.use('/games',games);
app.use('/matches', matches);

//WebSockets server
var aWss = eWs.getWss('/echo');
let connected = [];

app.ws('/realusers', (ws, req) => {
  ws.send('hola');
  ws.on('message', msg => {
    connected.push(msg);
    console.log(JSON.stringify(connected));
    ws.broadcast(JSON.stringify(connected));
  })
  ws.on('close', () => {
    connected = [];
    ws.broadcast('hola');
  })

  ws.broadcast = function broadcast(msg) {
    aWss.clients.forEach(function each(client) {
       client.send(msg);
    });
  };
})

const server = app.listen(config.server.port, config.server.host, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
  console.log(`Websocket listening at http://${address}:${port}`);
});

export default app;
