const { describe, it, beforeEach } = require('node:test');
const request = require('supertest');
const { createAndSetupApp } = require('../../src/app');

let app = null;

describe('Resource Route Handlers', () => {
  describe('Invalid Resource Route', () => {
    beforeEach(() => (app = createAndSetupApp()));
    it('Should give not found when the resource is not available', (_, done) => {
      request(app)
        .get('/some-invalid-resource')
        .expect('content-length', '310')
        .expect(404)
        .end(done);
    });
  });

  describe('GET /', () => {
    it('Should redirect to login page when no cookie is provided', (_, done) => {
      request(app)
        .get('/')
        .expect(302)
        .expect('location', '/pages/login.html')
        .end(done);
    });

    it('Should redirect to login page when cookie provided is not valid', (ctx, done) => {
      const isUserPresent = ctx.mock.fn(() => false);
      const authController = { isUserPresent };
      app.context = { authController };

      request(app)
        .get('/')
        .set('Cookie', 'auth=userHash')
        .expect(302)
        .expect('location', '/pages/login.html')
        .end(done);
    });

    it('Should serve home page when valid cookie is provided', (ctx, done) => {
      const isUserPresent = ctx.mock.fn(() => true);
      const authController = { isUserPresent };
      app.context = { authController };

      request(app)
        .get('/')
        .set('Cookie', 'auth=userHash')
        .expect(200)
        .end(done);
    });
  });
});
