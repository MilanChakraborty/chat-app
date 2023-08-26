const { createMessageLog } = require('./message-log');

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
    const [token] = usersToken || [];

    return token;
  }

  #createToken(participants) {
    this.#token += 1;
    this.#usersToken[this.#token] = participants;

    return this.#token;
  }

  #getUsersDetails() {
    return Object.fromEntries(
      Object.entries(this.#users).map(([username, chatHeads]) => {
        return [username, [...chatHeads]];
      })
    );
  }

  registerDirectMessage({ message, from, to }) {
    let token = this.#getToken([from, to]);
    if (!token) token = this.#createToken([from, to]);
    this.#users[from].add(to);
    this.#users[to].add(from);

    this.#messageLog.registerMessage(token, { message, from, to });
  }

  getChatHeads(username) {
    return [...this.#users[username]];
  }

  getDirectMessages(user1, user2) {
    const token = this.#getToken([user1, user2]);
    return this.#messageLog.getMessages(token);
  }

  get allChatsDetails() {
    return {
      messagesDetails: this.#messageLog.messagesDetails,
      usersDetails: this.#getUsersDetails(),
      usersTokenData: this.#usersToken,
    };
  }
}

const createUsers = (usersTokenData) => {
  return Object.fromEntries(
    Object.entries(usersTokenData).map(([username, chatHeads]) => [
      username,
      new Set(chatHeads),
    ])
  );
};

const createChats = ({ messagesDetails, usersDetails, usersTokenData }) => {
  const messageLog = createMessageLog(messagesDetails);
  const users = createUsers(usersDetails);

  return new Chats(messageLog, users, usersTokenData);
};

module.exports = { Chats, createChats };
