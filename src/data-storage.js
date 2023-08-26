class DataStorage {
  #storagePath;
  #fs;
  #data;
  constructor(storagePath, fs) {
    this.#storagePath = storagePath;
    this.#fs = fs;
  }

  init() {
    if (!this.#fs.existsSync(this.#storagePath)) {
      this.#fs.writeFileSync(this.#storagePath, '{}');
    }

    const rawData = this.#fs.readFileSync(this.#storagePath, 'utf-8');
    this.#data = JSON.parse(rawData || '{}');
  }

  get data() {
    return this.#data;
  }

  updateDatabase(data, onDatabaseUpdate) {
    this.#data = data;

    this.#fs.writeFile(
      this.#storagePath,
      JSON.stringify(data),
      onDatabaseUpdate
    );
  }
}

module.exports = DataStorage;
