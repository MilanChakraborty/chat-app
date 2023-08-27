const main = () => {
  const authContainer = document.querySelector('.auth');
  const view = new View(authContainer);
  const chatService = new ChatService();

  const controller = new Controller(chatService, view);
  controller.start();
};

window.onload = main;
