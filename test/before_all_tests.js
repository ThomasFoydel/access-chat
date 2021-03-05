const mongoose = require('mongoose');
require('dotenv').config();
mongoose.Promise = global.Promise;

mongoose.connect(process.env.TEST_DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

before((done) => {
  mongoose.connection
    .once('open', () => {
      return done();
    })
    .on('error', (err) => {
      console.log('db connection error: ', err);
    });
});
