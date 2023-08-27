const fs = require('node:fs');
const { createAndSetupApp } = require('./src/app');

const AUTH_STORAGE_PATH = './auth-data.js';

const injectDependencies = (app) => {
  const authController = createAuthController(AUTH_STORAGE_PATH, fs);
};

const main = () => {
  const PORT = 8000;
  const app = createAndSetupApp();
  injectDependencies(app);
  app.listen(PORT, () => console.log(`Chat Server is Listening on ${PORT}`));
};

main();
