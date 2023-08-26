const parseCookies = (rawCookies) => {
  const cookieString = rawCookies || '';
  const cookies = new URLSearchParams(cookieString.replace('; ', '&'));
  return Object.fromEntries([...cookies]);
};

const attachCookies = (req, _, next) => {
  req.cookies = parseCookies(req.headers.cookie);
  next();
};

module.exports = { attachCookies };
