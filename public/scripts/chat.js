const main = () => {
  const authContainer = document.querySelector('.auth');
  const chatHeadsElement = document.querySelector('.chat-heads');
  const chatHistoryContainer = document.querySelector(
    '.chat-history-container'
  );
  const view = new View(authContainer, chatHeadsElement, chatHistoryContainer);
  const chatService = new ChatService();
  const inputController = new InputController();

  const controller = new Controller(chatService, view, inputController);
  controller.start();
};

window.onload = main;
