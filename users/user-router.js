const router = require('express').Router();
const User = require('./userModel');

router.get('/:userId/tickets', (req, res, next) => {
  const { userId } = req.params;
  console.log('req.params', req.params);
  User.findByUserId(userId)
    .then(user => res.status(200).json(user))
    .catch(err => next(err));
});
module.exports = router;
