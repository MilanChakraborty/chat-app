const { describe, it } = require('node:test');
const assert = require('assert');
const DataStorage = require('../src/data-storage');

describe('Data Storage', () => {
  it('Should read data from path using file system on init when file exists', (ctx) => {
    const existsSync = ctx.mock.fn(() => true);
    const readFileSync = ctx.mock.fn();
    const fs = { existsSync, readFileSync };

    const dataStorage = new DataStorage('./somewhere', fs);
    dataStorage.init();

    assert.strictEqual(existsSync.mock.callCount(), 1);
    assert.strictEqual(readFileSync.mock.callCount(), 1);
    assert.strictEqual(readFileSync.mock.calls[0].arguments[0], './somewhere');
  });

  it('Should create a file when file doesnot exist', (ctx) => {
    const existsSync = ctx.mock.fn(() => false);
    const writeFileSync = ctx.mock.fn();
    const readFileSync = ctx.mock.fn();
    const fs = { existsSync, writeFileSync, readFileSync };

    const dataStorage = new DataStorage('./somewhere', fs);
    dataStorage.init();

    assert.strictEqual(existsSync.mock.callCount(), 1);
    assert.strictEqual(writeFileSync.mock.callCount(), 1);
    assert.deepStrictEqual(writeFileSync.mock.calls[0].arguments, [
      './somewhere',
      '{}',
    ]);
  });

  it('Should be able to give details of chats read from file', (ctx) => {
    const existsSync = ctx.mock.fn(() => true);
    const readFileSync = ctx.mock.fn(() => '{ "data": "fake data" }');
    const fs = { existsSync, readFileSync };

    const dataStorage = new DataStorage('./somewhere', fs);
    dataStorage.init();

    assert.deepStrictEqual(dataStorage.data, { data: 'fake data' });
  });

  it('Should be able to update database with new data', (ctx) => {
    const writeFile = ctx.mock.fn();
    const fs = { writeFile };

    const dataStorage = new DataStorage('./somewhere', fs);
    dataStorage.updateDatabase({ data: 'new data' }, 'fake function');

    assert.strictEqual(writeFile.mock.callCount(), 1);
    assert.deepStrictEqual(writeFile.mock.calls[0].arguments, [
      './somewhere',
      '{"data":"new data"}',
      'fake function',
    ]);
  });
});
