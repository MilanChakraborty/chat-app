const { describe, it } = require('node:test');
const assert = require('assert');
const Chats = require('../../src/models/chats');

describe('Chats', () => {
  describe('isUserPresent', () => {
    it('Should be false when user is not present', () => {
      const messageLog = {};
      const chats = new Chats(messageLog);

      assert.strictEqual(chats.isUserPresent('milan'), false);
    });
  });

  describe('addUser', () => {
    it('Should be able to add a new user', () => {
      const messageLog = {};
      const chats = new Chats(messageLog);
      chats.addUser('milan');

      assert.strictEqual(chats.isUserPresent('milan'), true);
    });
  });

  describe('registerPrivateMessage', () => {
    it('Should register message creating a new token when users havenot chatted before', (ctx) => {
      const registerMessage = ctx.mock.fn();
      const messageLog = { registerMessage };
      const chats = new Chats(messageLog);
      chats.addUser('milan');
      chats.addUser('raj');
      const message = { message: 'hii', from: 'milan', to: 'raj' };
      chats.registerPvtMessage(message);

      assert.strictEqual(registerMessage.mock.callCount(), 1);
      assert.deepStrictEqual(registerMessage.mock.calls[0].arguments, [
        1,
        { message: 'hii', from: 'milan', to: 'raj' },
      ]);
    });

    it('Should register message using existing token when users have chatted before', (ctx) => {
      const registerMessage = ctx.mock.fn();
      const messageLog = { registerMessage };
      const chats = new Chats(messageLog, {}, { 100: ['milan', 'raj'] });
      chats.addUser('milan');
      chats.addUser('raj');
      const message = { message: 'hii', from: 'milan', to: 'raj' };
      chats.registerPvtMessage(message);

      assert.strictEqual(registerMessage.mock.callCount(), 1);
      assert.deepStrictEqual(registerMessage.mock.calls[0].arguments, [
        '100',
        { message: 'hii', from: 'milan', to: 'raj' },
      ]);
    });
  });

  describe('getPvtMessages', () => {
    it('Should give all the messages for users', (ctx) => {
      const getMessages = ctx.mock.fn();
      const messageLog = { getMessages };
      const chats = new Chats(messageLog, {}, { 100: ['milan', 'raj'] });
      chats.addUser('milan');
      chats.addUser('raj');
      chats.getPvtMessages('milan', 'raj');

      assert.strictEqual(getMessages.mock.callCount(), 1);
      assert.deepStrictEqual(getMessages.mock.calls[0].arguments[0], '100');
    });
  });
});
