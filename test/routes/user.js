const chai = require('chai');
const { expect } = chai;
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

describe('User routes', () => {
  describe('POST /api/user/register', () => {
    beforeEach(async () => {
      const collections = await mongoose.connection.db.collections();
      for (let collection of collections) {
        if (collection.drop) {
          await collection.drop();
        }
      }
    });

    it('should reject registration when name is less than 8 characters', (done) => {
      chai
        .request(server)
        .post('/api/user/register')
        .send({
          ...exampleRegisterData,
          name: 'ced',
        })
        .end((err, response) => {
          expect(response.body.err).to.equal(
            'Name must be between 8 and 16 characters'
          );
          expect(response.statusCode).to.equal(400);
          done();
        });
    });

    it('should reject names too long', (done) => {
      chai
        .request(server)
        .post('/api/user/register')
        .send({
          ...exampleRegisterData,
          name: 'waaaayyyytoooooloooongusername',
        })
        .end((err, response) => {
          expect(response.body.err).to.include(
            'Name must be between 8 and 16 characters'
          );
          expect(response.statusCode).to.equal(400);
          done();
        });
    });

    it('should reject registration when passwords do not match', (done) => {
      chai
        .request(server)
        .post('/api/user/register')
        .send({
          ...exampleRegisterData,
          confirmpassword: 'Definitelycedric1988!$ExtraIncorrect',
        })
        .end((err, response) => {
          expect(response.body.err).to.include('Passwords do not match');
          expect(response.statusCode).to.equal(400);
          done();
        });
    });

    it('should reject registration when email is invalid', (done) => {
      chai
        .request(server)
        .post('/api/user/register')
        .send({
          ...exampleRegisterData,
          email: 'certainlynotcedriccedriccom',
        })
        .end((err, response) => {
          expect(response.statusCode).to.equal(400);
          expect(response.body.err).to.equal('Valid email required');
          done();
        });
    });

    it('should reject registration when password is too simple', (done) => {
      chai
        .request(server)
        .post('/api/user/register')
        .send({
          ...exampleRegisterData,
          password: '12345678',
          confirmpassword: '12345678',
        })
        .end((err, response) => {
          expect(response.body.err).to.include('Password must be more secure');
          expect(response.statusCode).to.equal(400);
          done();
        });
    });

    it('should register new users when form data is valid', (done) => {
      chai
        .request(server)
        .post('/api/user/register')
        .send(exampleRegisterData)
        .end((err, response) => {
          expect(response.statusCode).to.equal(201);
          expect(response.body.email).to.equal(exampleRegisterData.email);
          expect(response.body.name).to.equal(exampleRegisterData.name);
          done();
        });
    });
    it('should store the passwords as hashes', (done) => {
      chai
        .request(server)
        .post('/api/user/register')
        .send(exampleRegisterData)
        .end(async (err, response) => {
          const match = await bcrypt.compare(
            exampleRegisterData.password,
            response.body.password
          );
          expect(match);
          expect(response.statusCode).to.equal(201);
          expect(response.body.password).to.not.equal(
            exampleRegisterData.password
          );
          expect(response.body.name).to.equal(exampleRegisterData.name);
          done();
        });
    });
  });

  describe('POST /api/user/login', () => {
    before(() => {
      User.create(exampleRegisterData).then(() => done());
    });
    it('should log in a user', (done) => {
      chai
        .request(server)
        .post('/api/user/login')
        .send(exampleLoginData)
        .end(async (err, response) => {
          expect(response.statusCode).to.equal(200);
          expect(response.body.user).to.exist;
          expect(response.body.token).to.exist;
          done();
        });
    });

    it('should reject log in attempt with incorrect password', (done) => {
      chai
        .request(server)
        .post('/api/user/login')
        .send({
          ...exampleLoginData,
          password: exampleLoginData.password + 'wrongtext',
        })
        .end(async (err, response) => {
          expect(response.statusCode).to.equal(401);
          expect(response.body.err).to.equal('Incorrect auth info');
          expect(response.body.token).to.not.exist;
          done();
        });
    });
    it('should reject log in attempt with incorrect email', (done) => {
      chai
        .request(server)
        .post('/api/user/login')
        .send({
          ...exampleLoginData,
          email: exampleLoginData.email + 'wrongtext',
        })
        .end(async (err, response) => {
          expect(response.statusCode).to.equal(400);
          expect(response.body.err).to.equal('Incorrect auth info');
          expect(response.body.token).to.not.exist;
          done();
        });
    });
  });
});
