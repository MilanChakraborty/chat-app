class View {
  #authContainer;
  #chatHeadsElement;
  #listeners;

  constructor(authContainer, chatHeadsElement) {
    this.#authContainer = authContainer;
    this.#chatHeadsElement = chatHeadsElement;
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
}
