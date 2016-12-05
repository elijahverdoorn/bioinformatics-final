var express = require('express');
var router = express.Router();
var app = express();
var calculate = require('../lib/calculate');

/* GET input page. */
router.get('/', function(req, res, next) {
  res.render('input');
});

router.post('/', function(req, res){
  var topString = req.topSequence;
  var sideString = req.sideSequence;
  calculate(topString, sideString);
  res.send('success');
});

module.exports = router;
