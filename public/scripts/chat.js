const main = () => {
  const authContainer = document.querySelector('.auth');
  const chatHeadsElement = document.querySelector('.chat-heads');
  const view = new View(authContainer, chatHeadsElement);
  const chatService = new ChatService();
  const inputController = new InputController();

  const controller = new Controller(chatService, view, inputController);
  controller.start();
};

window.onload = main;
