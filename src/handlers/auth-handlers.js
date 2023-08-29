const redirectToHomePage = (_, res) => {
  res.redirect('/');
};

const redirectToLoginPage = (_, res) => {
  res.redirect('/pages/login.html');
};

const userLoggedIn = (req) => req.cookies.auth !== undefined;

const sendUserNotExists = (_, res) => {
  res.status(401);
  res.json({ userNotExists: true, invalidPassword: null });
};

const sendInvalidPassword = (_, res) => {
  res.status(401);
  res.json({ invalidPassword: true, userNotExists: false });
};

const sendUsernameExists = (_, res) => {
  console.log('reached');
  res.status(401);
  res.json({ usernameExists: true });
};

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
  const { authController } = req.app.context;
  const userHash = authController.getUserHash(username);

  if (!authController.isUserPresent(userHash))
    return sendUserNotExists(req, res);

  if (!authController.validateUserLogin(username, password))
    return sendInvalidPassword(req, res);

  res.cookie('auth', userHash);
  return redirectToHomePage(req, res);
};

const handleSignupRequest = (req, res) => {
  const { username, password } = req.body;
  const { authController, chatsController } = req.app.context;
  const userHash = authController.getUserHash(username);

  if (authController.isUserPresent(userHash))
    return sendUsernameExists(req, res);

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
  handleSignupRequest,
};
