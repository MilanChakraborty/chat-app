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
    beforeEach(() => (app = createAndSetupApp()));
    it('Should serve the home page', (_, done) => {
      request(app).get('/').expect(200).end(done);
    });
  });
});
