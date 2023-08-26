class MessageLog {
  #log;
  constructor(log = {}) {
    this.#log = log;
  }

  registerMessage(token, messageInfo) {
    const messages = this.#log[token] || [];
    messages.push(messageInfo);
    this.#log[token] = messages;
  }

  getMessages(token) {
    return [...(this.#log[token] || [])];
  }

  get messagesDetails() {
    return { ...this.#log };
  }
}

module.exports = MessageLog;
