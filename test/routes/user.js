const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../index.js');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

chai.use(chaiHttp);

const exampleRegisterData = {
  name: 'CedricCedrickson',
  email: 'certainlynotcedric@cedric.com',
  password: 'Definitelycedric1988!$',
  confirmpassword: 'Definitelycedric1988!$',
};

describe('User routes', () => {
  describe('POST /api/user/register', () => {
    beforeEach((done) => {
      if (mongoose.connection.collections.users)
        mongoose.connection.collections.users.drop(() => {
          done();
        });
    });
    it('should reject registration when name is less than 8 characters', () => {
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
});
