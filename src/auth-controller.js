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
    this.#users.isUserPresent(userHash);
  }

  addUser(username, password, onDatabaseUpdate) {
    this.#users.addUser(username, password);
    this.#updateDatabase(onDatabaseUpdate);
  }
}

module.exports = { AuthController };
