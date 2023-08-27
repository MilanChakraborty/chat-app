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

const handleDirectMessageRequest = (req, res) => {
  const { chatsController, authController } = req.app.context;
  const { message } = req.body;
  const timestamp = new Date().toGMTString();
  const { to } = req.params;
  const { auth } = req.cookies;
  const username = authController.getUsername(auth);
  const messageDetails = { from: username, message, to, timestamp };

  chatsController.registerDirectMessage(messageDetails, () => {
    res.status(204);
    res.end();
  });
};

module.exports = {
  handleChatHeadsRequest,
  handleUserExistsRequest,
  handleChatHistoryRequest,
  handleDirectMessageRequest,
};
