const redirectToHomePage = (_, res) => {
  res.redirect('/');
};

const sendAuthenticationFailed = (_, res) => {
  res.status(401).json({ passwordInvalid: true });
};

const invalidPassword = (authController, userHash, username, password) =>
  authController.isUserPresent(userHash) &&
  !authController.validateUserLogin(username, password);

const redirectToLoginPage = (_, res) => {
  res.redirect('/pages/login.html');
};

const userLoggedIn = (req) => req.cookies.auth !== undefined;

const isValidUser = (req) => {
  const { authController } = req.app.context;
  const userHash = req.cookies.auth;
  return authController.isUserPresent(userHash);
};

const validateUserLogin = (req, res, next) => {
  if (!userLoggedIn(req) || !isValidUser(req))
    return redirectToLoginPage(req, res);
  next();
};

const handleLoginRequest = (req, res) => {
  const { username, password } = req.body;
  const { authController, chatsController } = req.app.context;
  const userHash = authController.getUserHash(username);

  if (invalidPassword(authController, userHash, username, password))
    return sendAuthenticationFailed(req, res);

  if (authController.validateUserLogin(username, password)) {
    res.cookie('auth', userHash);
    return redirectToHomePage(req, res);
  }

  authController.addUser(username, password, (userHash) => {
    chatsController.addUser(username, () => {
      res.cookie('auth', userHash);
      redirectToHomePage(req, res);
    });
  });
};

const handleLoginDetailsRequest = (req, res) => {
  const { authController } = req.app.context;
  const { auth } = req.cookies;
  const username = authController.getUsername(auth);
  const isLoggedIn = authController.isUserPresent(auth);

  res.json({ username, isLoggedIn });
};

const handleLogoutRequest = (request, response) => {
  response.clearCookie('auth');
  redirectToHomePage(request, response);
};

module.exports = {
  validateUserLogin,
  handleLoginRequest,
  handleLoginDetailsRequest,
  handleLogoutRequest,
};
