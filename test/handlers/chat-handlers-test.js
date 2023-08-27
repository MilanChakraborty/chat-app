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
