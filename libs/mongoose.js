var mongoose = require('mongoose');

mongoose.set('debug', true);

mongoose.connect('mongodb://localhost/documentation', {
    server: {
        poolSize: 5
    }
});

module.exports = mongoose;