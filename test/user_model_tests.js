const User = require('../models/User');
const assert = require('assert');

const exampleUserData = { name: 'Reginald', email: 'reginald@example.com' };

describe('User model', () => {
  it('saves new user to db', (done) => {
    const newUser = new User(exampleUserData);
    newUser
      .save()
      .then((result) => {
        assert(result.isNew === false);
        done();
      })
      .catch((err) => {
        console.log('err: ', err);
      });
  });

  it('saves new user with name', (done) => {
    const newUser = new User(exampleUserData);
    newUser
      .save()
      .then((result) => {
        assert(result.name === exampleUserData.name);
        done();
      })
      .catch((err) => {
        console.log('err: ', err);
      });
  });

  it('rejects new user with name less than 8 characters', (done) => {
    const newUser = new User({ ...exampleUserData, name: '2short' });
    newUser
      .save()
      .then()
      .catch((err) => {
        assert(
          String(err.errors.name).includes(
            'name must be between 8 and 16 characters'
          )
        );
        done();
      });
  });
  it('rejects new user with name less more than 16 characters', (done) => {
    const newUser = new User({
      ...exampleUserData,
      name: 'waaaayyyyytooooollloooonnng',
    });
    newUser.save().catch((err) => {
      assert(
        String(err.errors.name).includes(
          'name must be between 8 and 16 characters'
        )
      );
      done();
    });
  });
  it('rejects values that cannot be cast to string for name', (done) => {
    const newUser = new User({
      ...exampleUserData,
      name: ['1', '1', '1', '1', '1', '1', '1', '1'],
    });
    newUser.save().catch((err) => {
      assert(String(err.errors.name).includes('CastError'));
      done();
    });
  });

  it('creates user with valid email', (done) => {
    const newUser = new User(exampleUserData);
    newUser.save().then((result) => {
      assert(result.email === exampleUserData.email);
      done();
    });
  });

  it('rejects invalid emails', (done) => {
    const newUser = new User({
      ...exampleUserData,
      email: 'NotAnEmail10101@.',
    });
    newUser.save().catch((err) => {
      assert(String(err.errors.email).includes('must be a valid email'));
      done();
    });
  });
});
