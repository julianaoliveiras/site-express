var router = require('express').Router();

const PAGE = 'home';
//var home = require('../views/home/home.mustache')

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.cookies.username) {
    return res.render(PAGE, { username: req.cookies.username });
  }

  return res.render(PAGE);
});

// router.get('/contato', function (req, res, next) {
//   if (req.cookies.username) {
//     res.render('login', { username: req.cookies.username });
//   }

//   res.render('./contato', { title: 'Express' });
// });

// router.get('/tecnologias', function (req, res, next) {
//   if (req.cookies.username) {
//     res.render('login', { username: req.cookies.username });
//   }

//   res.render('./tecnologias', { title: 'Express' });
// });

// router.get('/sobre', function (req, res, next) {
//   if (req.cookies.username) {
//     res.render('login', { username: req.cookies.username });
//   }

//   res.render('./sobre', { title: 'Express' });
// });

// router.get('/login', function (req, res, next) {
//   if (req.query.fail) {
//     res.render('login', { message: 'Usuário e/ou senha incorretos!' });
//   }

//   if (req.cookies.username) {
//     res.render('login', { username: req.cookies.username });
//   }

//   res.render('login');
// });

// router.get('/registrar', function (req, res, next) {
//   if (req.cookies.username) {
//     res.render('login', { username: req.cookies.username });
//   }

//   res.render('./registrar', { title: 'Express' });
// });

// module.exports = router;
module.exports = router;
