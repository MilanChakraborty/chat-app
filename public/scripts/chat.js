const main = () => {
  const authContainer = document.querySelector('.auth');
  const view = new View(authContainer);
  const chatService = new ChatService();
  const inputController = new InputController();

  const controller = new Controller(chatService, view, inputController);
  controller.start();
};

window.onload = main;
