const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET login page. */
router.get('/', (req, res, next) => {
  if (req.query.fail) {
    res.render('login', { message: 'Usuário e/ou senha incorretos!' });
  } else res.render('login', { message: null });
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

    console.log(JSON.stringify(req.query));

    req.login(user, (error) => {
      if (error) {
        return next(error);
      }

      res.cookie('username', user.username);

      return res.redirect(`/login?user=${user.username}`);
    });
  })(req, res, next);
});

module.exports = router;
