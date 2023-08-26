class ChatsController {
  #chats;
  #chatsStorage;
  constructor(chats, chatsStorage) {
    this.#chats = chats;
    this.#chatsStorage = chatsStorage;
  }

  #updateDatabase(onDatabaseUpdate) {
    const chatsData = this.#chats.allChatsDetails;
    this.#chatsStorage.updateDatabase(chatsData, onDatabaseUpdate);
  }

  addUser(username, onDatabaseUpdate) {
    this.#chats.addUser(username);
    this.#updateDatabase(onDatabaseUpdate);
  }

  registerDirectMessage(messagesDetails, onDatabaseUpdate) {
    this.#chats.registerDirectMessage(messagesDetails);
    this.#updateDatabase(onDatabaseUpdate);
  }

  isUserPresent(username) {
    return this.#chats.isUserPresent(username);
  }

  getChatHeads(username) {
    this.#chats.getChatHeads(username);
  }

  getDirectMessages(user1, user2) {
    this.#chats.getDirectMessages(user1, user2);
  }
}

module.exports = { ChatsController };
