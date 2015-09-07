var express = require('express');
var router = express.Router();
var methodOverride = require('method-override');
var mongoose = require('../libs/mongoose');
var Article = require('../libs/schema');
var url = require("url");



router.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method
    }
}));

router.get('/', function (req, res, next) {
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
});
router.get('/articles/', function (req, res, next) {
    mongoose.model('Article').find({}, function (err, articles) {
            if (err) {
                return console.error(err);
            } else {
                res.format({

                    //HTML response will render the index.jade file in the views/blobs folder. We are also setting "articles" to be an accessible variable in our jade view
                    html: function () {
                        res.render('articles-list', {
                            title: 'Список статей',
                            "articles": articles

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
});
router.post('/', function (req, res, next) {
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
});


router.param('id', function (req, res, next, id) {
    //console.log('validating ' + id + ' exists');
    //find the ID in the Database
    mongoose.model('Article').findById(id, function (err, article) {
        //if it isn't found, we are going to repond with 404
        if (err) {
            console.log(id + ' was not found');
            res.status(404)
            var err = new Error('Not Found');
            err.status = 404;
            res.format({
                html: function () {
                    next(err);
                },
                json: function () {
                    res.json({message: err.status + ' ' + err});
                }
            });
            //if it is found we continue on
        } else {
            req.id = id;
            // go to the next thing
            next();
        }
    });
});


router.route('/articles/:id')
    .get(function (req, res) {
        var pathname = url.parse(req.url).pathname;
        mongoose.model('Article').findById(req.id, function (err, article) {
            if (err) {
                console.log('GET Error: There was a problem retrieving: ' + err);
            } else {
               // console.log('GET Retrieving ID: ' + article._id);
                var articles = article.created.toISOString();
                articles = articles.substring(0, articles.indexOf('T'));
                res.format({
                    html: function () {
                        res.render('one-article', {
                            "title": article.title,
                            "articleDate": articles,
                            "articleOne": article,
                            "pathnameArticles" : pathname.substring(0,10)
                        });
                    },
                    json: function () {
                        res.json(article);
                    }
                });
            }
        });
    });

router.get('/articles/:id/edit', function (req, res) {
    //search for the blob within Mongo
    mongoose.model('Article').findById(req.id, function (err, article) {
        if (err) {
            console.log('GET Error: There was a problem retrieving: ' + err);
        } else {
            //Return the blob
            console.log('GET Retrieving ID: ' + article._id);
            //format the date properly for the value to show correctly in our edit form
            var date = article.created.toISOString();
            date = date.substring(0, date.indexOf('T'));

            res.format({
                //HTML response will render the 'edit.jade' template
                html: function () {
                    res.render('edit-articles', {
                        title: 'Р РµРґР°РєС‚РёСЂРІРѕР°РЅРёРµ СЃС‚Р°С‚СЊРё  ' + article.title,
                        "date": date,
                        "article": article
                    });
                },
                //JSON response will return the JSON output
                json: function () {
                    res.json(article);
                }
            });
        }
    });
});


router.put('/articles/:id/edit', function(req, res) {
    // Get our REST or form values. These rely on the "name" attributes
    var title = req.body.titleArticles,
        description = req.body.descriptionArticles;

    //find the document by ID
    mongoose.model('Article').findById(req.id, function (err, article) {
        //update it
        article.update({
            title : title,
            description : description,
            created: new Date,
            numberSort : Date.now()

        }, function (err, articleID) {
            if (err) {
                res.send("There was a problem updating the information to the database: " + err);
            }
            else {
                //HTML responds by going back to the page or you can be fancy and create a new view that shows a success page.
                res.format({
                    html: function(){
                        res.redirect("/articles/" + article._id);
                    },
                    //JSON responds showing the updated values
                    json: function(){
                        res.json(article);
                    }
                });
            }
        })
    });
});

router.delete('/articles/:id/edit', function (req, res){
    //find blob by ID
    mongoose.model('Article').findById(req.id, function (err, article) {
        if (err) {
            return console.error(err);
        } else {
            //remove it from Mongo
            article.remove(function (err, oneArticle) {
                if (err) {
                    return console.error(err);
                } else {
                    //Returning success messages saying it was deleted
                    //console.log('__________________DELETE removing ID: ' + oneArticle._id);
                    res.format({
                        //HTML returns us back to the main page, or you can create a success page
                        html: function(){
                            res.redirect("/");
                        },
                        //JSON returns the item with the message that is has been deleted
                        json: function(){
                            res.json({message : 'deleted',
                                item : oneArticle
                            });
                        }
                    });
                }
            });
        }
    });
});





module.exports = router;
