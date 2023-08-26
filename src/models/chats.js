class Chats {
  #messageLog;
  #users;
  #usersToken;
  #token;
  constructor(messageLog, users = {}, usersToken = {}) {
    this.#messageLog = messageLog;
    this.#users = users;
    this.#usersToken = usersToken;
    this.#token = Object.keys(usersToken).length;
  }

  isUserPresent(username) {
    return username in this.#users;
  }
}

module.exports = Chats;
