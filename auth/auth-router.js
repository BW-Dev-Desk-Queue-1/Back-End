const router = require('express').Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets.js');
const Users = require('../users/userModel.js');
const Helpers = require('../helpers/helperModel.js');

router.post('/register', (req, res, next) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 5); // 2 ^ n

  user.password = hash;
  // console.log(user)
  Users.addUser(user)
    .then(saved => {
      console.log(saved);
      const token = signToken(saved);
      res.status(201).json({ ...saved, password: '*******', token });
    })
    .catch(error => {
      // res.send
      //       next(error);
      next(error);
    });
});

// fix helper
router.post('/helpers/register', (req, res, next) => {
  let helper = req.body;

  const hash = bcrypt.hashSync(helper.password, 5); // 2 ^ n

  helper.password = hash;

  Helpers.addHelper(helper)
    .then(saved => {
      // console.log('saved helper', saved)
      const token = signToken(saved);
      res.status(201).json({ ...saved, password: '*******', token });
    })
    .catch(error => {
      // console.log('caught')
      //                 res.status(500).json({ message: 'can\'t add a helper'})
      //       next(error);
      next(error);
    });
});

router.post('/login', (req, res, next) => {
  let { username, password } = req.body;

  Users.findByUserName(username)
    .first()
    .then(user => {
      return sendResultToUser(req, res, next, user, password);
    })
    .catch(error => {
      next(error);
    });
});
router.post('/helpers/login', (req, res, next) => {
  let { username, password } = req.body;

  Helpers.findByHelperName(username)
    .first()
    .then(user => {
      return sendResultToUser(req, res, next, user, password);
    })
    .catch(error => {
      next(error);
    });
});

//hoisted to top of scope
function signToken(user) {
  const payload = {
    userId: user.id,
    username: user.username,
    userAccessType: user.accessType
  };

  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, jwtSecret, options);
}

function sendResultToUser(req, res, next, user, password) {
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = signToken(user);

    res
      .status(200)
      .json({ token, accessType: user.accessType, userId: user.id });
  } else {
    res.status(401).json({ message: 'Invalid Credentials' });
  }
}
module.exports = router;
