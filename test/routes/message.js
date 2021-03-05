const chai = require('chai');
const { expect } = chai;
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const server = require('../../index.js');
const User = require('../../models/User.js');

chai.use(chaiHttp);

const exampleRegisterData = {
  name: 'CedricCedrickson',
  email: 'certainlynotcedric@cedric.com',
  password: 'Definitelycedric1988!$',
  confirmpassword: 'Definitelycedric1988!$',
};

const exampleLoginData = {
  email: exampleRegisterData.email,
  password: exampleRegisterData.password,
};

const exampleRegisterData2 = {
  name: 'winston10000',
  email: 'wsmith@gmail.com',
  password: '&&masterArn0ldPalmerThief',
  confirmpassword: '&&masterArn0ldPalmerThief',
};

describe('Message routes', () => {
  beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      if (collection.drop) {
        await collection.drop();
      }
    }
  });

  describe('POST /api/message', () => {
    it('creates a new message', () => {
      let user1;
      let user2;
      User.create(exampleRegisterData)
        .then((user) => {
          user1 = user;
          return User.create(exampleRegisterData2);
        })
        .then((user) => {
          user2 = user;
          const exampleMessageData = {
            receiver: user2._id,
            content: 'i KNOW you took my arnold palmer, winston!',
          };

          chai
            .request(server)
            .post('/api/user/login')
            .send(exampleLoginData)
            .end(async (err, response) => {
              const token = response.body.token;

              chai
                .request(server)
                .post('/api/message')
                .set('x-auth-token', token)
                .send(exampleMessageData)
                .end((err, messageResponse) => {
                  expect(messageResponse.body.content).to.equal(
                    exampleMessageData.content
                  );
                  expect(messageResponse.body.sender).to.equal(
                    user1._id.toString()
                  );
                  expect(messageResponse.body.receiver).to.equal(
                    user2._id.toString()
                  );
                });
            });
        });
    });
  });
});
