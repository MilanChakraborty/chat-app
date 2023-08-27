const DataStorage = require('./data-storage');
const { createUsers } = require('./models/users');

class AuthController {
  #users;
  #dataStorage;
  constructor(users, dataStorage) {
    this.#users = users;
    this.#dataStorage = dataStorage;
  }

  #updateDatabase(onDatabaseUpdate) {
    const usersData = this.#users.details;
    this.#dataStorage.updateDatabase(usersData, onDatabaseUpdate);
  }

  validateUserLogin(username, password) {
    return this.#users.validateUserLogin(username, password);
  }

  isUserPresent(userHash) {
    return this.#users.isUserPresent(userHash);
  }

  addUser(username, password, onDatabaseUpdate) {
    const userHash = this.#users.addUser(username, password);
    this.#updateDatabase(() => onDatabaseUpdate(userHash));
  }

  getUsername(userHash) {
    return this.#users.getUsername(userHash);
  }

  getUserHash(username) {
    return this.#users.getUserHash(username);
  }
}

const createAuthController = (storagePath, fs) => {
  const authStorage = new DataStorage(storagePath, fs);
  authStorage.init();
  const users = createUsers(authStorage.data);

  return new AuthController(users, authStorage);
};

module.exports = { AuthController, createAuthController };
