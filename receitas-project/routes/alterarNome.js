var router = require('express').Router();

const PAGE = 'alterarNome';

router.get('/', function (req, res, next) {
  if (!req.cookies.username) {
    return res.redirect('./login');
  }

  return res.render(PAGE, { username: req.cookies.username });
});

router.post('/', (req, res, next) => {
  const { username } = req.body;

  return res.cookie('username', username).redirect('/');
});

module.exports = router;
