const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null;

    if (!token) {
      return res.status(400).json({ message: "Не авторизован" });
    }

    const decoded = jwt.verify(token, config.get("secretKey"));

    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    return res.send({ message: "Auth error!" });
  }
};
