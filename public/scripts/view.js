class View {
  #authContainer;
  #chatHeadsElement;
  #chatHistoryContainer;
  #listeners;

  constructor(authContainer, chatHeadsElement, chatHistoryContainer) {
    this.#authContainer = authContainer;
    this.#chatHeadsElement = chatHeadsElement;
    this.#chatHistoryContainer = chatHistoryContainer;
    this.#listeners = {};
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

    return chatHeadElement;
  }

  #createConnectedToHeader(connectedTo) {
    const header = document.createElement('header');
    const headingElement = document.createElement('h1');
    headingElement.innerText = `____  ${connectedTo}  ____`;
    headingElement.classList.add('connect-to-header');
    header.append(headingElement);

    return header;
  }

  #createChatElement(chat) {
    const chatElement = document.createElement('p');
    chatElement.innerText = JSON.stringify(chat);
    chatElement.classList.add('chat');

    return chatElement;
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

  renderChatHistory(connectedTo, chats) {
    this.#removeExistingElements(this.#chatHistoryContainer);
    const connectedToHeader = this.#createConnectedToHeader(connectedTo);
    const chatsElements = chats.map((chat) => this.#createChatElement(chat));
    this.#chatHistoryContainer.append(connectedToHeader, ...chatsElements);
  }
}
