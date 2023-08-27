const handleChatHeadsRequest = (req, res) => {
  const { chatsController, authController } = req.app.context;
  const { auth } = req.cookies;
  const username = authController.getUsername(auth);
  const chatHeads = chatsController.getChatHeads(username);
  
  res.json(chatHeads);
};

module.exports = { handleChatHeadsRequest };