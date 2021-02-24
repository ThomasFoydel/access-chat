const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.TEST_DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

before(() => {
  mongoose.connection
    .once('open', () => {
      console.log('up and running');
    })
    .on('error', (err) => {
      console.log('db connection error: ', err);
    });
});

beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    done();
  });
});
