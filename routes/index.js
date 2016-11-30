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
  "items": [
    [
      "A","B","C","D"
    ],
    [
      "E","F","G","H"
    ]
  ]
};

router.get('/list', function(req, res, next) {
  res.render('list', {
    "items": items
  });
});

module.exports = router;
