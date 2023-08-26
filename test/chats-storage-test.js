const { describe, it } = require('node:test');
const assert = require('assert');
const ChatsStorage = require('../src/chats-storage');

describe('Chats Storage', () => {
  it('Should read data from path using file system on init when file exists', (ctx) => {
    const existsSync = ctx.mock.fn(() => true);
    const readFileSync = ctx.mock.fn();
    const fs = { existsSync, readFileSync };

    const chatsStorage = new ChatsStorage('./somewhere', fs);
    chatsStorage.init();

    assert.strictEqual(existsSync.mock.callCount(), 1);
    assert.strictEqual(readFileSync.mock.callCount(), 1);
    assert.strictEqual(readFileSync.mock.calls[0].arguments[0], './somewhere');
  });

  it('Should create a file when file doesnot exist', (ctx) => {
    const existsSync = ctx.mock.fn(() => false);
    const writeFileSync = ctx.mock.fn();
    const readFileSync = ctx.mock.fn();
    const fs = { existsSync, writeFileSync, readFileSync };

    const chatsStorage = new ChatsStorage('./somewhere', fs);
    chatsStorage.init();

    assert.strictEqual(existsSync.mock.callCount(), 1);
    assert.strictEqual(writeFileSync.mock.callCount(), 1);
    assert.deepStrictEqual(writeFileSync.mock.calls[0].arguments, [
      './somewhere',
      '{}',
    ]);
  });
});
