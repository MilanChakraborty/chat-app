const { createAndSetupApp } = require('./src/app');

const main = () => {
  const PORT = 8000;
  const app = createAndSetupApp();
  app.listen(PORT, () => console.log(`Chat Server is Listening on ${PORT}`));
};

main();
