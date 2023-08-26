const express = require('express');
const { requestLogger } = require('./middlewares/logger.js');
const { attachCookies } = require('./middlewares/attach-cookies.js');
const {
  handleHomePageRequest,
  respondNotFound,
} = require('./handlers/resource-route-handlers');

const addMiddlewares = (app) => {
  app.use(requestLogger);
  app.use(attachCookies);
  app.use(express.json());
  app.use(express.urlencoded());
};

const addRouteHandlers = (app) => {
  app.get('/', handleHomePageRequest);
  app.use(express.static('public'));
  app.use(respondNotFound);
};

const createAndSetupApp = () => {
  const app = express();
  addMiddlewares(app);
  addRouteHandlers(app);
  return app;
};

module.exports = { createAndSetupApp };
