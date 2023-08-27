const fs = require('node:fs');
const { createAndSetupApp } = require('./src/app');
const { createAuthController } = require('./src/auth-controller');
const { createChatsController } = require('./src/chats-controller');

const AUTH_STORAGE_PATH = './auth-data.json';
const CHATS_STORAGE_PATH = './chats-data.json';

const injectDependencies = (app) => {
  const authController = createAuthController(AUTH_STORAGE_PATH, fs);
  const chatsController = createChatsController(CHATS_STORAGE_PATH, fs);
  app.context = { authController, chatsController };
};

const main = () => {
  const PORT = 8000;
  const app = createAndSetupApp();
  injectDependencies(app);
  app.listen(PORT, () => console.log(`Chat Server is Listening on ${PORT}`));
};

main();
