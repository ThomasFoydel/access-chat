const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const apiRoutes = require('./routes/api');
const socketio = require('socket.io');
const jwt = require('jsonwebtoken');

require('dotenv').config();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mongoURI =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGO_URI
    : process.env.TEST_DB;

app.use('/api', apiRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

mongoose
  .connect(mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    const expressServer = app.listen(process.env.PORT || 8000);
    const io = socketio(expressServer);

    io.on('connection', (socket) => {
      const token = socket.handshake.query.token;
      if (!token) {
        console.log('no token auth denied');
      } else {
        try {
          const decoded = jwt.verify(token, process.env.SECRET);
          let currentTime = Date.now() / 1000;
          if (decoded.exp < currentTime) {
          } else {
            let { userId } = decoded.tokenUser;
            const currentUser = {
              userId: userId,
              socketId: socket.id,
            };
            users = users.filter((user) => user.userId !== userId);
            users.push(currentUser);
          }
        } catch (err) {
          console.log('err: ', err);
        }
      }
    });
  });

module.exports = app;
