var router = require('express').Router();
var passport = require('passport');

router.get(
  '/',
  // passport.authenticate('local', { session: false }),
  (req, res, next) => {
    if (req.cookies.username) {
      res.clearCookie('username');
    }

    return res.redirect('/login');
  }
);

module.exports = router;
