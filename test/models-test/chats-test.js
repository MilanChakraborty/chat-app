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
});
