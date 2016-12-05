var express = require('express');
var router = express.Router();

var items = {
  "topSequence": [
    "A","B","C","D"
  ],
  "sideSequence": [
    "E","F","G","H"
  ]
};

/* GET table page. */
router.get('/', function(req, res, next) {
  res.render('table', {
    "items": items
  });
});


module.exports = router;
