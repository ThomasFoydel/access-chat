const assert = require('assert');
const mongoose = require('mongoose');
const User = require('../../models/User');
const Message = require('../../models/Message');

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
  let exampleMessage;

  before((done) => {
    mongoose.connection.collections.users.drop(() => {
      userOne = new User(exampleUserData);
      userTwo = new User(exampleFriendData);
      userOne
        .save()
        .then(() => userTwo.save())
        .then(() => {
          exampleMessage = {
            sender: userOne._id,
            receiver: userTwo._id,
            participants: [userOne._id, userTwo._id],
            content: 'did you drink my arnold palmer?',
          };
          done();
        });
    });
  });

  beforeEach((done) => {
    if (mongoose.connection.collections.messages) {
      mongoose.connection.collections.messages.drop(() => {
        done();
      });
    }
  });

  it('should save new messages', (done) => {
    const newMessage = new Message(exampleMessage);
    newMessage.save().then((result) => {
      assert(!result.isNew);
      done();
    });
  });

  it('should save new messages with correct information', (done) => {
    const newMessage = new Message(exampleMessage);
    newMessage.save().then((result) => {
      assert(
        result.sender === exampleMessage.sender &&
          result.receiver === exampleMessage.receiver &&
          result.content === exampleMessage.content &&
          result.participants.includes(exampleMessage.sender) &&
          result.participants.includes(exampleMessage.receiver)
      );
      done();
    });
  });

  it('should reject messages over the 500 char limit', (done) => {
    const newMessage = new Message({
      ...exampleMessage,
      content: Array(501).fill('A').join(''),
    });
    newMessage.save().catch((err) => {
      assert(err);
      done();
    });
  });
});
