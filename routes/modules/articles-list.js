var url = require("url");
var mongoose = require('../../libs/mongoose');
var Article = require('../../libs/schema');

var articlesList = function (req, res, next) {
    var pathname = url.parse(req.url).pathname;
    mongoose.model('Article').find({}, function (err, articles) {
            if (err) {
                return console.error(err);
            } else {
                res.format({

                    //HTML response will render the index.jade file in the views/blobs folder. We are also setting "articles" to be an accessible variable in our jade view
                    html: function () {
                        res.render('index', {
                            title: 'Документация для дизайнеров',
                            "articles": articles,
                            "pathname" : pathname
                        });
                    },
                    //JSON response will show all blobs in JSON format
                    json: function () {
                        res.json(articles);
                    }
                });
            }
        }
    );
};
articlesList.prototype.getTitle = function(title){
    return title
};




module.exports = articlesList;