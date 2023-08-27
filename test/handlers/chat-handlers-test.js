const { describe, it } = require('node:test');
const request = require('supertest');
const { createAndSetupApp } = require('../../src/app');

describe('GET /chat-heads', () => {
  it('Should return all the chatheads of the user', (ctx, done) => {
    const getUsername = ctx.mock.fn();
    const getChatHeads = ctx.mock.fn(() => ['raj']);
    const isUserPresent = () => true;

    const authController = { getUsername, isUserPresent };
    const chatsController = { getChatHeads };

    const app = createAndSetupApp();
    app.context = { authController, chatsController };

    request(app)
      .get('/chat-heads')
      .set('Cookie', 'auth=userHash')
      .expect(200)
      .expect('content-type', /application\/json/)
      .expect(['raj'])
      .end(done);
  });
});

describe('GET /user-exists/:username', () => {
  it('Should return true if userexists or false', (ctx, done) => {
    const isUserPresent = ctx.mock.fn(() => true);
    const authController = { isUserPresent };
    const chatsController = { isUserPresent };

    const app = createAndSetupApp();
    app.context = { authController, chatsController };

    request(app)
      .get('/user-exists/milan')
      .set('Cookie', 'auth=userHash')
      .expect(200)
      .expect({ isUserPresent: true })
      .end(done);
  });
});

describe('GET /chat-history/:withUser', () => {
  it('Should return true if userexists or false', (ctx, done) => {
    const isUserPresent = ctx.mock.fn(() => true);
    const getUsername = ctx.mock.fn(() => 'milan');
    const getDirectMessages = ctx.mock.fn(() => []);

    const authController = { isUserPresent, getUsername };
    const chatsController = { isUserPresent, getDirectMessages };

    const app = createAndSetupApp();
    app.context = { authController, chatsController };

    request(app)
      .get('/chat-history/raj')
      .set('Cookie', 'auth=userHash')
      .expect(200)
      .expect([])
      .end(done);
  });
});

describe('POST /direct-message/:to', () => {
  it('Should register the direct message', (ctx, done) => {
    const isUserPresent = ctx.mock.fn(() => true);
    const getUsername = ctx.mock.fn(() => 'milan');
    const registerDirectMessage = ctx.mock.fn((_, callback) => callback());

    const authController = { isUserPresent, getUsername };
    const chatsController = { isUserPresent, registerDirectMessage };

    const app = createAndSetupApp();
    app.context = { authController, chatsController };

    request(app)
      .post('/direct-message/raj')
      .set('Cookie', 'auth=userHash')
      .send({ message: 'hello' })
      .expect(204)
      .end(done);
  });
});
