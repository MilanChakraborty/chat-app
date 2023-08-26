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
}

module.exports = { ChatsController };
