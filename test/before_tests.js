const mongoose = require('mongoose');
require('dotenv').config();
mongoose.Promise = global.Promise;

mongoose.connect(process.env.TEST_DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

before((done) => {
  mongoose.connection
    .once('open', () => done())
    .on('error', (err) => {
      console.log('db connection error: ', err);
    });
});

beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    done();
  });
});
