const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config/secrets.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        res
          .status(401)
          .json({ message: "you are a teapot. this can't be used" });
      } else {
        req.user = decodedToken;
        // have to get accessType out of decodedToken
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'you shall not pass!' });
  }
};
