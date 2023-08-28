class View {
  #authContainer;
  #chatHeadsElement;
  #chatHistoryContainer;
  #listeners;
  #scrollbarPosition;
  #chatsContainer;

  constructor(authContainer, chatHeadsElement, chatHistoryContainer) {
    this.#authContainer = authContainer;
    this.#chatHeadsElement = chatHeadsElement;
    this.#chatHistoryContainer = chatHistoryContainer;
    this.#listeners = {};
    this.#scrollbarPosition = null;
    this.#chatsContainer = null;
  }

  addListener(eventName, callback) {
    this.#listeners[eventName] = callback;
  }

  #addUsernameElement(username) {
    const usernameElement = document.createElement('p');
    usernameElement.innerText = `Welcome, ${username}`;

    this.#authContainer.append(usernameElement);
  }

  #removeExistingElements(todosContainer) {
    [...todosContainer.children].forEach((child) => {
      child.remove();
    });
  }

  #addLogoutButton() {
    const logoutElement = document.createElement('p');
    logoutElement.innerText = 'Logout';
    logoutElement.classList.add('auth-button');
    logoutElement.onclick = this.#listeners['logout'];

    this.#authContainer.append(logoutElement);
  }

  #createChatHeadElement(chatHead) {
    const chatHeadElement = document.createElement('p');
    chatHeadElement.innerText = chatHead;
    chatHeadElement.classList.add('chat-head');
    const { connect } = this.#listeners;
    chatHeadElement.onclick = () => connect(chatHead);

    return chatHeadElement;
  }

  #createConnectedToHeader(connectedTo) {
    const header = document.createElement('header');
    const headingElement = document.createElement('h1');
    headingElement.innerText = `${connectedTo}`;
    headingElement.classList.add('connect-to-header');
    header.append(headingElement);

    return header;
  }

  #addMessageAndTimeStamp(chatElement, message, timestamp) {
    const messageElement = document.createElement('p');
    const timestampElement = document.createElement('p');

    messageElement.innerText = message;
    messageElement.classList.add('message');
    timestampElement.innerText = timestamp;
    timestampElement.classList.add('timestamp');

    chatElement.append(messageElement, timestampElement);
  }

  #addMessageTypeClass(chatElement, isRecievedMessage) {
    if (isRecievedMessage) {
      chatElement.classList.add('recieve-message');
      return;
    }
    chatElement.classList.add('send-message');
  }

  #createChatElement({ from, message, timestamp }, connectedTo) {
    const chatElement = document.createElement('p');
    const isRecievedMessage = from === connectedTo;
    chatElement.classList.add('chat');

    this.#addMessageTypeClass(chatElement, isRecievedMessage);
    this.#addMessageAndTimeStamp(chatElement, message, timestamp);

    return chatElement;
  }

  #createChatsContainer() {
    const chatsContainer = document.createElement('section');
    chatsContainer.classList.add('chats-container');

    return chatsContainer;
  }

  renderAuthSection({ username }) {
    this.#addUsernameElement(username);
    this.#addLogoutButton();
  }

  renderChatHeads(chatHeads) {
    this.#removeExistingElements(this.#chatHeadsElement);
    const chatHeadElements = chatHeads.map((chatHead) =>
      this.#createChatHeadElement(chatHead)
    );

    this.#chatHeadsElement.append(...chatHeadElements);
  }

  renderChatPage(connectedTo, chats) {
    this.#removeExistingElements(this.#chatHistoryContainer);
    const connectedToHeader = this.#createConnectedToHeader(connectedTo);
    const chatsContainer = this.#createChatsContainer();
    this.#chatsContainer = chatsContainer;
    const chatsElements = chats.map((chat) =>
      this.#createChatElement(chat, connectedTo)
    );

    chatsContainer.append(...chatsElements);
    this.#chatHistoryContainer.append(connectedToHeader, chatsContainer);
  }

  updateChatHistory(connectedTo, chats) {
    this.#scrollbarPosition = this.#chatsContainer.scrollTop;
    this.#removeExistingElements(this.#chatsContainer);

    const chatsElements = chats.map((chat) =>
      this.#createChatElement(chat, connectedTo)
    );
    this.#chatsContainer.append(...chatsElements);
    this.#chatsContainer.scrollTop = this.#scrollbarPosition;
  }
}
