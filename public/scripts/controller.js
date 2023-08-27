class Controller {
  #view;
  #chatService;
  constructor(chatService, view) {
    this.#chatService = chatService;
    this.#view = view;
  }

  #fetchAndRenderLoginDetails() {
    this.#chatService.getLoginDetails((loginDetails) => {
      this.#view.renderAuthSection(loginDetails);
    });
  }

  #requestLogout() {
    this.#chatService.requestLogout();
  }

  start() {
    this.#fetchAndRenderLoginDetails();
    this.#view.addListener('logout', () => this.#requestLogout('logout'));
  }
}
