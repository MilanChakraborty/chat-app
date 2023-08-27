const { describe, it } = require('node:test');
const assert = require('assert');
const { Users, createUsers } = require('../../src/models/users');

describe('Users', () => {
  describe('isUserPresent', () => {
    it('Should be false if the user doesnot exist', () => {
      const users = new Users();
      assert.strictEqual(users.isUserPresent('not-a-hash'), false);
    });

    it('Should be true if the user exists', () => {
      const users = new Users({ userHash: {} });
      assert.strictEqual(users.isUserPresent('userHash'), true);
    });
  });

  describe('getUsername', () => {
    it('Should give the username of the user when hash is provided', () => {
      const users = new Users({ userHash: { username: 'milan' } });
      assert.strictEqual(users.getUsername('userHash'), 'milan');
    });
  });

  describe('add User', () => {
    it('Should be able to add a new user', () => {
      const users = new Users();
      const userHash = users.addUser('milan', '1234');

      assert.ok(users.isUserPresent(userHash));
    });
  });

  describe('validateUserLogin', () => {
    it('Should be true if the username and the password are given correctly', () => {
      const users = new Users();
      users.addUser('milan', '1234');

      assert.ok(users.validateUserLogin('milan', '1234'));
    });

    it('Should be false if user doesnot exist', () => {
      const users = new Users();
      users.addUser('milan', '1234');

      assert.strictEqual(users.validateUserLogin('raj', '1234'), false);
    });

    it('Should be false if password is incorrect', () => {
      const users = new Users();
      users.addUser('milan', '1234');

      assert.strictEqual(users.validateUserLogin('milan', '123'), false);
    });
  });

  it('Should be able to give all users data', () => {
    const users = new Users();
    const userHash = users.addUser('milan', '1234');

    assert.deepStrictEqual(users.details, {
      [userHash]: { username: 'milan', password: '1234' },
    });
  });
});

describe('CreateUser', () => {
  it('Should create an Users instance with the given data', () => {
    const usersDetails = { userHash: { username: 'milan', password: 1234 } };
    const users = createUsers(usersDetails);

    assert.ok(users.isUserPresent('userHash'));
  });
});
