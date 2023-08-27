const { describe, it } = require('node:test');
const assert = require('assert');
const {
  AuthController,
  createAuthController,
} = require('../src/auth-controller');

describe('Auth Controller', () => {
  it('should be able to add User', (ctx) => {
    const addUser = ctx.mock.fn(() => 'userHash');
    const updateDatabase = ctx.mock.fn();
    const dataStorage = { updateDatabase };
    const users = { addUser, details: 'Fake Data' };
    const callback = ctx.mock.fn();

    const authController = new AuthController(users, dataStorage);
    authController.addUser('milan', '1234', callback);

    const [, onDatabaseUpdate] = updateDatabase.mock.calls[0].arguments;
    onDatabaseUpdate();

    assert.strictEqual(addUser.mock.callCount(), 1);
    assert.deepStrictEqual(addUser.mock.calls[0].arguments, ['milan', '1234']);
    assert.strictEqual(updateDatabase.mock.callCount(), 1);
    assert.strictEqual(updateDatabase.mock.calls[0].arguments[0], 'Fake Data');
    assert.strictEqual(callback.mock.callCount(), 1);
    assert.strictEqual(callback.mock.calls[0].arguments[0], 'userHash');
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

  it('should be able to give username when userHash is provided', (ctx) => {
    const getUsername = ctx.mock.fn(() => 'milan');
    const users = { getUsername };
    const dataStorage = {};

    const authController = new AuthController(users, dataStorage);
    assert.strictEqual(authController.getUsername('userHash'), 'milan');
    assert.strictEqual(getUsername.mock.callCount(), 1);
    assert.strictEqual(getUsername.mock.calls[0].arguments[0], 'userHash');
  });

  it('should be able to get hash of user', (ctx) => {
    const getUserHash = ctx.mock.fn();
    const users = { getUserHash };
    const dataStorage = {};

    const authController = new AuthController(users, dataStorage);
    authController.getUserHash('milan');

    assert.strictEqual(getUserHash.mock.callCount(), 1);
    assert.strictEqual(getUserHash.mock.calls[0].arguments[0], 'milan');
  });
});

describe('Create Auth Controller', () => {
  it('Should create a Auth controller with given data', (ctx) => {
    const existsSync = ctx.mock.fn(() => true);
    const readFileSync = ctx.mock.fn(() => '{"userHash":{}}');
    const fs = { existsSync, readFileSync };
    const storagePath = {};

    const authController = createAuthController(storagePath, fs);

    assert.strictEqual(authController.isUserPresent('userHash'), true);
  });
});
