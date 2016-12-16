var express = require('express');
var router = express.Router();
var app = express();
var calculate = require('../lib/calculate');

/* GET input page. */
router.get('/', function(req, res, next) {
  res.render('input');
});

router.post('/', function(req, res){
  var topString = req.body.topSequence;
  var sideString = req.body.sideSequence;
  var topStringArr = JSON.parse(calculate.parseString(req.body.topSequence));
  var sideStringArr = JSON.parse(calculate.parseString(req.body.sideSequence));
  var json = calculate.calculate(topString, sideString);
  console.log(json);
  res.render('table', {'nodesArr': json.nodeArr, 'path': JSON.stringify(json.pathArr), 'topString': topStringArr, 'sideString': sideStringArr});
});

module.exports = router;
