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
  if (!(topString && sideString) || topString.length != sideString.length) {
    // console.log('strings');
    res.render('badInput');
    return;
  }

  var match = req.body.matchScore;
  var mismatch = req.body.mismatchScore;
  var indel = req.body.indelScore;
  var amino = req.body.useAmino;

  if (!(match && mismatch && indel)) {
    // console.log('numbers');
    res.render('badInput');
    return;
  }

  var topStringArr = JSON.parse(calculate.parseString(req.body.topSequence));
  var sideStringArr = JSON.parse(calculate.parseString(req.body.sideSequence));

  var json = calculate.calculate(topString, sideString, match, mismatch, indel);
  res.render('table', {'nodesArr': json.nodeArr, 'path': JSON.stringify(json.pathArr), 'topString': topStringArr, 'sideString': sideStringArr});
});

module.exports = router;
