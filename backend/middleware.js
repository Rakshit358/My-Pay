const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./config");
function authMiddleware(req, res, next) {
  const authHeaders = req.headers.authorization;
  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Fail" });
  }

  const token = authHeaders.split(" ")[1];
  jwt.verify(token, JWT_SECRET.JWT_SECRET, function (err, decoded) {
    if (err) {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    req.userId = decoded.userId;
    next();
  });
}

module.exports = {
  authMiddleware,
};
