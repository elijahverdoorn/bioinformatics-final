var express = require('express');
var router = express.Router();
var app = express();

/* GET input page. */
router.get('/', function(req, res, next) {
  res.render('input');
});

router.post('/', function(req, res){
  console.log('test');
  res.send('success');
});

module.exports = router;
