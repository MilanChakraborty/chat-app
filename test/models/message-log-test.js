const { describe, it } = require('node:test');
const assert = require('assert');
const {
  MessageLog,
  createMessageLog,
} = require('../../src/models/message-log');

describe('Message Log', () => {
  it('Should give no messages when token is invalid', () => {
    const messageLog = new MessageLog();

    assert.deepStrictEqual(messageLog.getMessages(1), []);
  });

  it('Should give the messages of given token number', () => {
    const messages = [{ message: 'hii', from: 'raj', to: 'milan' }];
    const messageLog = new MessageLog({ 1: messages });

    assert.deepStrictEqual(messageLog.getMessages(1), messages);
  });

  it('Should be able to register message to given token number', () => {
    const message = { message: 'hii', from: 'raj', to: 'milan' };
    const messageLog = new MessageLog();
    messageLog.registerMessage(1, message);

    assert.deepStrictEqual(messageLog.getMessages(1), [message]);
  });

  it('Should be able to give all messages details', () => {
    const message = { message: 'hii', from: 'raj', to: 'milan' };
    const messageLog = new MessageLog();
    messageLog.registerMessage(1, message);
    const expectedMessagesDetails = { 1: [message] };

    assert.deepStrictEqual(messageLog.messagesDetails, expectedMessagesDetails);
  });
});

describe('Create Message Log', () => {
  it('Should create Message Log instance with message details', () => {
    const messagesDetails = { 1: [], 2: [] };
    const messageLog = createMessageLog(messagesDetails);

    assert.deepStrictEqual(messageLog.messagesDetails, messagesDetails);
  });
});
