var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
   // console.log(req.baseUrl); // /greet
    res.render('designers', { title: 'Documentation' });
});

module.exports = router;
