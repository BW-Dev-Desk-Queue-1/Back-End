// middleware for admin and helpers only
module.exports = (req, res, next) => {
  const userAccess = req.user.userAccessType;

  let accessed = false;
  if (userAccess == 'helper' || userAccess === 'admin') accessed = true;

  if (req.user && accessed) {
    next();
  } else
    res.status(401).json({
      message:
        'Access to this route is not authorized..., access for admin and helpers only'
    });
};
