const mongoose = require('mongoose');
const assert = require('assert');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

const exampleUserData = {
  name: 'Reginald',
  email: 'reginald@example.com',
  password: 'ReginaldRules1994!!',
};
const exampleFriendData = {
  name: 'joe10000000',
  email: 'joerheinhardt@someexample.com',
  password: 'reginaldsFriend',
};

describe('User model', () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });

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
    newUser.save().catch((err) => {
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

  it('hashes passwords when new user is saved', (done) => {
    const newUser = new User(exampleUserData);
    newUser.save().then(async (result) => {
      const match = await bcrypt.compare(
        exampleUserData.password,
        result.password
      );
      assert(match);
      done();
    });
  });

  it('validates hashed passwords', (done) => {
    const newUser = new User(exampleUserData);
    newUser.save().then(async () => {
      const match = await newUser.validatePassword(exampleUserData.password);
      assert(match);
      done();
    });
  });

  it('should allow friends ref ids to be added to friends array', (done) => {
    const reginald = new User(exampleUserData);
    const joe = new User(exampleFriendData);
    reginald
      .save()
      .then(() => joe.save())
      .then((savedJoe) =>
        User.updateOne(
          { email: exampleUserData.email },
          { $push: { friends: savedJoe._id } }
        )
      )
      .then(() => User.findOne({ _id: reginald._id }).populate('friends'))
      .then((result) => {
        assert(result.friends[0]._id.toString() === joe._id.toString());
        done();
      });
  });
});
