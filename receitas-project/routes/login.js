var router = require('express').Router();
var passport = require('passport');

const PAGE = 'login';

/* GET login page. */
router.get('/', function (req, res, next) {
  if (req.query.fail) {
    return res.render(PAGE, { message: 'Usuário e/ou senha incorretos!' });
  }

  if (req.cookies.username) {
    return res.redirect('/');
  }

  return res.render(PAGE);
});

/* POST login page */
// router.post(
//   '/',
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login?fail=true',
//   })
// );

router.post('/', (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      return next(error);
    }

    if (!user) {
      return res.redirect('/login?fail=true');
    }

    req.logIn(user, (error) => {
      if (error) {
        return next(error);
      }

      res.cookie('username', user.username);

      return res.redirect(`/login?user=${user.username}`);
    });
  })(req, res, next);
});

module.exports = router;
