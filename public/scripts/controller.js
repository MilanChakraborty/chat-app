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
  constructor(chatService, view, inputController) {
    this.#chatService = chatService;
    this.#view = view;
    this.#inputController = inputController;
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

  #requestLogout() {
    this.#chatService.requestLogout();
  }

  start() {
    this.#fetchAndRenderLoginDetails();
    this.#fetchAndRenderChatHeads();
    this.#view.addListener('logout', () => this.#requestLogout('logout'));
    this.#inputController.onConnect((connectTo) => console.log(connectTo));
    this.#inputController.onSend((message) => console.log(message));
  }
}
