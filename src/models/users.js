const { createHash } = require('node:crypto');

class Users {
  #users;
  constructor(users = {}) {
    this.#users = users;
  }

  #getUserHash(username) {
    return createHash('md5').update(username).digest('hex');
  }

  validateUserLogin(username, password) {
    const userHash = this.#getUserHash(username);
    const userDetails = this.#users[userHash];
    if (!userDetails) return false;

    return userDetails.password === password;
  }

  isUserPresent(userHash) {
    return userHash in this.#users;
  }

  addUser(username, password) {
    const userHash = this.#getUserHash(username);
    this.#users[userHash] = { username, password };
    return userHash;
  }

  get details() {
    return this.#users;
  }
}

const createUsers = (usersDetails) => {
  return new Users(usersDetails);
};

module.exports = { Users, createUsers };
