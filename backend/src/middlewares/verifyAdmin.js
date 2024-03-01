/* eslint-disable consistent-return */
const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Accès non autorisé" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err || user.role !== "administrateur") return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = verifyAdmin;
