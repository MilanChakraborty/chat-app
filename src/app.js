const express = require('express');
const {
  handleHomePageRequest,
  respondNotFound,
} = require('./handlers/resource-route-handlers');

const addRouteHandlers = (app) => {
  app.get('/', handleHomePageRequest);
  app.use(express.static('public'));
  app.use(respondNotFound);
};

const createAndSetupApp = () => {
  const app = express();
  addRouteHandlers(app);
  return app;
};

module.exports = { createAndSetupApp };
