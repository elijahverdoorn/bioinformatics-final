var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/helloworld', function(req, res, next) {
  res.render('helloworld', { title: 'Elijah'});
});

var items = {
  "topSequence": [
    "A","B","C","D"
  ],
  "sideSequence": [
    "E","F","G","H"
  ]
};

router.get('/list', function(req, res, next) {
  res.render('list', {
    "items": items
  });
});

router.get('/table', function(req, res, next) {
  res.render('table', {
    "items": items
  });
});

module.exports = router;
