const { describe, it, beforeEach } = require('node:test');
const request = require('supertest');
const { createAndSetupApp } = require('../../src/app');
const assert = require('assert');

let app = null;

describe('POST /login', () => {
  beforeEach(() => (app = createAndSetupApp()));
  it('Should give invalidPassword as true if password entered is invalid', (ctx, done) => {
    const isUserPresent = ctx.mock.fn(() => true);
    const validateUserLogin = ctx.mock.fn(() => false);
    const getUserHash = ctx.mock.fn(() => 'userHash');
    const authController = { isUserPresent, validateUserLogin, getUserHash };

    const userDetails = 'username=milan&password=1234';

    app.context = { authController };
    request(app)
      .post('/login')
      .send(userDetails)
      .expect(401)
      .expect('Content-Type', /application\/json/)
      .expect({ passwordInvalid: true })
      .end(done);
  });

  it('Should set auth cookie and redirect to home page, when existing user logs in', (ctx, done) => {
    const isUserPresent = ctx.mock.fn(() => true);
    const validateUserLogin = ctx.mock.fn(() => true);
    const getUserHash = ctx.mock.fn(() => 'userHash');
    const authController = { isUserPresent, validateUserLogin, getUserHash };

    const userDetails = 'username=milan&password=1234';

    app.context = { authController };
    request(app)
      .post('/login')
      .send(userDetails)
      .expect(302)
      .expect('location', '/')
      .expect('Set-Cookie', 'auth=userHash; Path=/')
      .end(done);
  });
});
