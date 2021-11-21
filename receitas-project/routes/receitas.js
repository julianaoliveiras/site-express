var router = require('express').Router();

const PAGE = 'receitas';

router.get('/', function (req, res, next) {
  if (req.cookies.username) {
    return res.render(PAGE, { username: req.cookies.username });
  }

  return res.render(PAGE);
});

module.exports = router;
