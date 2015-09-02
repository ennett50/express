var express = require('express');
var router = express.Router();

var mongoose = require('../libs/mongoose');
var User = require('../libs/schema');

var mary = new User({
    email: 'mary@mail.com'
});


User.remove({}, function(err) {
    mary.save(function(err, result) {
        console.log(result);
        User.findOne({
            email: 'mary@mail.com'
        }, function(err, user) {
            console.log(user);

            // ... do more with mary

            // no unref!
            mongoose.disconnect();
        });
    });

});

console.log('mary --------  ' + mary);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
      title: 'Documentation',
      nameUser: mary.email

  });
});

module.exports = router;
