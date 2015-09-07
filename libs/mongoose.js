var mongoose = require('mongoose');

mongoose.set('debug', true);

mongoose.connect('mongodb://admin:qwerty@localhost/documentation', {
    server: {
        poolSize: 5
    }
});

module.exports = mongoose;