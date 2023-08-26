const { describe, it } = require('node:test');
const assert = require('assert');
const { ChatsController } = require('../src/chats-controller');

describe('ChatsController', () => {
  it('Should be able to add User', (ctx) => {
    const addUser = ctx.mock.fn();
    const updateDatabase = ctx.mock.fn();
    const chatsStorage = { updateDatabase };
    const chats = { addUser, allChatsDetails: 'Fake Data' };

    const chatsController = new ChatsController(chats, chatsStorage);
    chatsController.addUser('milan', 'Fake Callback');

    assert.strictEqual(addUser.mock.callCount(), 1);
    assert.strictEqual(addUser.mock.calls[0].arguments[0], 'milan');
    assert.strictEqual(updateDatabase.mock.callCount(), 1);
    assert.deepStrictEqual(updateDatabase.mock.calls[0].arguments, [
      'Fake Data',
      'Fake Callback',
    ]);
  });
});
