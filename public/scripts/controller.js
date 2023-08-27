class InputController {
  #readConnectInputBox() {
    const connectInputBox = document.querySelector('#connect-input-box');
    const connectTo = connectInputBox.value;
    connectInputBox.value = '';

    return connectTo;
  }

  #readSendInputBox() {
    const sendInputBox = document.querySelector('#send-input-box');
    const message = sendInputBox.value;
    sendInputBox.value = '';

    return message;
  }

  onConnect(onSubmit) {
    const connectForm = document.querySelector('#connection-form');
    connectForm.onsubmit = (event) => {
      event.preventDefault();
      const connectTo = this.#readConnectInputBox();
      onSubmit(connectTo);
    };
  }

  onSend(onSubmit) {
    const sendForm = document.querySelector('#send-form');
    sendForm.onsubmit = (event) => {
      event.preventDefault();
      const message = this.#readSendInputBox();
      onSubmit(message);
    };
  }
}

class Controller {
  #view;
  #chatService;
  #inputController;
  #connectedTo;
  constructor(chatService, view, inputController) {
    this.#chatService = chatService;
    this.#view = view;
    this.#inputController = inputController;
    this.#connectedTo = null;
  }

  #fetchAndRenderLoginDetails() {
    this.#chatService.getLoginDetails((loginDetails) => {
      this.#view.renderAuthSection(loginDetails);
    });
  }

  #fetchAndRenderChatHeads() {
    this.#chatService.getChatHeads((chatHeads) => {
      this.#view.renderChatHeads(chatHeads);
    });
  }

  #fetchAndRenderChatHistory() {
    this.#chatService.getChatHistory(this.#connectedTo, (chats) => {
      this.#view.renderChatHistory(this.#connectedTo, chats);
    });
  }

  #onConnect(connectedTo) {
    this.#connectedTo = connectedTo;
    this.#chatService.isUserExists(connectedTo, ({ isUserPresent }) => {
      if (isUserPresent) return this.#fetchAndRenderChatHistory();
      alert('User Doesnot Exist');
    });
  }

  #onSend(message) {
    if (!this.#connectedTo)
      return alert('Please Connect To Someone to Send Message');
    this.#chatService.sendDirectMessage(this.#connectedTo, message, () => {
      this.#fetchAndRenderChatHistory();
    });
  }

  #requestLogout() {
    this.#chatService.requestLogout();
  }

  start() {
    this.#fetchAndRenderLoginDetails();
    this.#fetchAndRenderChatHeads();
    this.#view.addListener('logout', () => this.#requestLogout('logout'));
    this.#inputController.onConnect((connectTo) => this.#onConnect(connectTo));
    this.#inputController.onSend((message) => this.#onSend(message));
  }
}
