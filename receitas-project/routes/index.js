var express = require('express');
var router = express.Router();
//var home = require('../views/home/home.mustache')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./home', { title: 'Express' });
});

router.get('/contato', function(req, res, next) {
  res.render('./contato', { title: 'Express' });
});
router.get('/tecnologias', function(req, res, next) {
  res.render('./tecnologias', { title: 'Express' });
});
router.get('/sobre', function(req, res, next) {
  res.render('./sobre', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('./login', { title: 'Express' });
});
router.get('/registrar', function(req, res, next) {
  res.render('./registrar', { title: 'Express' });
});

module.exports = router;