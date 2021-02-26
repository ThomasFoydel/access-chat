const assert = require('assert');
const mongoose = require('mongoose');
const User = require('../../models/User');
const FriendRequest = require('../../models/FriendRequest');

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

describe('message model', () => {
  let userOne;
  let userTwo;
  let exampleFriendRequest;

  before((done) => {
    mongoose.connection.collections.users.drop(() => {
      userOne = new User(exampleUserData);
      userTwo = new User(exampleFriendData);
      userOne
        .save()
        .then(() => userTwo.save())
        .then(() => {
          exampleFriendRequest = {
            sender: userOne._id,
            receiver: userTwo._id,
            participants: [userOne._id, userTwo._id],
          };
          done();
        });
    });
  });

  beforeEach((done) => {
    if (mongoose.connection.collections.friendRequests) {
      mongoose.connection.collections.friendRequests.drop(() => {
        done();
      });
    } else {
      done();
    }
  });

  it('should save new friend requests', (done) => {
    const newFriendRequest = new FriendRequest(exampleFriendRequest);
    newFriendRequest.save().then((result) => {
      assert(!result.isNew);
      done();
    });
  });

  it('should save new friend requests structure correctly', (done) => {
    const newFriendRequest = new FriendRequest(exampleFriendRequest);
    newFriendRequest.save().then((result) => {
      assert(
        result.sender === exampleFriendRequest.sender &&
          result.receiver === exampleFriendRequest.receiver &&
          result.participants.includes(exampleFriendRequest.sender) &&
          result.participants.includes(exampleFriendRequest.receiver)
      );
      done();
    });
  });

  it('should have a default status value of pending', (done) => {
    const newFriendRequest = new FriendRequest(exampleFriendRequest);
    newFriendRequest.save().then((result) => {
      assert(result.status === 'pending');
      done();
    });
  });
});
