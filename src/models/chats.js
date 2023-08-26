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

  addUser(username) {
    this.#users[username] = new Set();
  }

  isUserPresent(username) {
    return username in this.#users;
  }

  #getToken(users) {
    const areParticipantsPresent = ([_, participants]) =>
      participants.every((participant) => users.includes(participant));

    const usersToken = Object.entries(this.#usersToken).find(
      areParticipantsPresent
    );
    const token = (usersToken || [])[0];

    return token;
  }

  #createToken(participants) {
    this.#token += 1;
    this.#usersToken[this.#token] = participants;

    return this.#token;
  }

  registerPvtMessage({ message, from, to }) {
    let token = this.#getToken([from, to]);
    if (!token) token = this.#createToken([from, to]);
    this.#users[from].add(to);
    this.#users[to].add(from);

    this.#messageLog.registerMessage(token, { message, from, to });
  }
}

module.exports = Chats;
