const handleChatHeadsRequest = (req, res) => {
  const { chatsController, authController } = req.app.context;
  const { auth } = req.cookies;
  const username = authController.getUsername(auth);
  const chatHeads = chatsController.getChatHeads(username);

  res.json(chatHeads);
};

const handleUserExistsRequest = (req, res) => {
  const { chatsController } = req.app.context;
  const { username } = req.params;
  const isUserPresent = chatsController.isUserPresent(username);

  res.json({ isUserPresent });
};

const handleChatHistoryRequest = (req, res) => {
  const { chatsController, authController } = req.app.context;
  const { auth } = req.cookies;
  const username = authController.getUsername(auth);
  const { withUser } = req.params;
  const chatHistory = chatsController.getDirectMessages(username, withUser);

  res.json(chatHistory);
};

module.exports = {
  handleChatHeadsRequest,
  handleUserExistsRequest,
  handleChatHistoryRequest,
};
