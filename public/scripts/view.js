class View {
  #authContainer;
  #listeners;

  constructor(authContainer) {
    this.#authContainer = authContainer;
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

  #addLogoutButton() {
    const logoutElement = document.createElement('p');
    logoutElement.innerText = 'Logout';
    logoutElement.classList.add('auth-button');
    logoutElement.onclick = this.#listeners['logout'];

    this.#authContainer.append(logoutElement);
  }

  renderAuthSection({ username }) {
    this.#addUsernameElement(username);
    this.#addLogoutButton();
  }
}
