const { describe, it } = require('node:test');
const assert = require('assert');
const { AuthController } = require('../src/auth-controller');

describe('Auth Controller', () => {
  it('should be able to add User', (ctx) => {
    const addUser = ctx.mock.fn();
    const updateDatabase = ctx.mock.fn();
    const dataStorage = { updateDatabase };
    const users = { addUser, details: 'Fake Data' };

    const authController = new AuthController(users, dataStorage);
    authController.addUser('milan', '1234', 'Fake Callback');

    assert.strictEqual(addUser.mock.callCount(), 1);
    assert.deepStrictEqual(addUser.mock.calls[0].arguments, ['milan', '1234']);
    assert.strictEqual(updateDatabase.mock.callCount(), 1);
    assert.deepStrictEqual(updateDatabase.mock.calls[0].arguments, [
      'Fake Data',
      'Fake Callback',
    ]);
  });

  it('should be able to check whether user Present', (ctx) => {
    const isUserPresent = ctx.mock.fn();
    const users = { isUserPresent };
    const dataStorage = {};

    const authController = new AuthController(users, dataStorage);
    authController.isUserPresent('userHash');

    assert.strictEqual(isUserPresent.mock.callCount(), 1);
    assert.strictEqual(isUserPresent.mock.calls[0].arguments[0], 'userHash');
  });

  it('should be able to validate user login', (ctx) => {
    const validateUserLogin = ctx.mock.fn();
    const users = { validateUserLogin };
    const dataStorage = {};

    const authController = new AuthController(users, dataStorage);
    authController.validateUserLogin('userHash');

    assert.strictEqual(validateUserLogin.mock.callCount(), 1);
    assert.strictEqual(
      validateUserLogin.mock.calls[0].arguments[0],
      'userHash'
    );
  });
});
