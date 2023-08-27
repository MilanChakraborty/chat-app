const redirectToHomePage = (_, res) => {
  res.redirect('/');
};

const sendAuthenticationFailed = (_, res) => {
  res.status(401).json({ passwordInvalid: true });
};

const invalidPassword = (authController, userHash, username, password) =>
  authController.isUserPresent(userHash) &&
  !authController.validateUserLogin(username, password);

const handleLoginRequest = (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  const { authController } = req.app.context;
  const userHash = authController.getUserHash(username);

  if (invalidPassword(authController, userHash, username, password))
    return sendAuthenticationFailed(req, res);

  if (authController.validateUserLogin(username, password)) {
    res.cookie('auth', userHash);
    return redirectToHomePage(req, res);
  }

  authController.addUser(username, password, (userHash) => {
    res.cookie('auth', userHash);
    redirectToHomePage(req, res);
  });
};

module.exports = { handleLoginRequest };
