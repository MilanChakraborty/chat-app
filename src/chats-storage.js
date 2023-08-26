class ChatsStorage {
  #storagePath;
  #fs;
  #chatsData;
  constructor(storagePath, fs) {
    this.#storagePath = storagePath;
    this.#fs = fs;
  }

  init() {
    if (!this.#fs.existsSync(this.#storagePath)) {
      this.#fs.writeFileSync(this.#storagePath, '{}');
    }

    const rawData = this.#fs.readFileSync(this.#storagePath, 'utf-8');
    this.#chatsData = JSON.parse(rawData || '{}');
  }
}

module.exports = ChatsStorage;
