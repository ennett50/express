var url = require("url");
var mongoose = require('../../libs/mongoose');
var Article = require('../../libs/schema');

var getPostArticles = function (req, res,  next) {
    //console.log('--------------------------' + JSON.stringify(req.body));

    var title = req.body.titleArticles,
        description = req.body.descriptionArticles;

    mongoose.model('Article').create({
        title: title,
        description: description
    }, function (err, article) {
        if (err) {
            console.log(err);
            res.send('There was a problem adding the information to the database.')
        } else {
            // console.log('POST creating new article: ' + article);
            res.format({
                html: function () {
                    res.redirect('/');
                },
                json: function () {
                    res.json(article);
                }
            });
            //mongoose.disconnect();
        }
    });
};




module.exports = getPostArticles;