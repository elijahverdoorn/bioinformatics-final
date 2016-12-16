var express = require('express');
var router = express.Router();

/* GET table page. */
router.get('/', function(req, res, next) {
  res.render('table', {
    "items": items
  });
});


module.exports = router;
