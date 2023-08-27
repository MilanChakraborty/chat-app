const ROOT_DIR = process.env.PWD;

const userLoggedIn = (req) => req.cookies.auth !== undefined;

const isValidUser = (req) => {
  const { authController } = req.app.context;
  const userHash = req.cookies.auth;
  return authController.isUserPresent(userHash);
};

const serveHomePage = (_, res) => {
  res.sendFile(`${ROOT_DIR}/public/index.html`);
};

const redirectToLoginPage = (_, res) => {
  res.redirect('/pages/login.html');
};

const handleHomePageRequest = (req, res) => {
  if (!userLoggedIn(req) || !isValidUser(req))
    return redirectToLoginPage(req, res);
  serveHomePage(req, res);
};
const respondNotFound = (_, res) => {
  res.status(404);
  res.sendFile(`${ROOT_DIR}/public/pages/not-found.html`);
};

module.exports = { handleHomePageRequest, respondNotFound };
