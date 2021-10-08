module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.username === "jack" && req.body.password === "123456") {
      return res.status(200).json({
        user: {
          token: "login-token",
        },
      });
    } else {
      return res.status(400).json({
        message: "username or password is wrong",
      });
    }
  }
  if (req.method === "GET" && req.path === "/me") {
    return res.status(200).jsonp({
      user: {
        token: req.Headers.Authorization.split(" ")[1],
      },
    });
  }
  next();
};
