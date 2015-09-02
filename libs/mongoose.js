var mongoose = require('mongoose');

mongoose.set('debug', true);

mongoose.connect('mongodb://localhost/express', {
    server: {
        socketOptions: {
            keepAlive: 1
        },
        poolSize: 5
    }
});

module.exports = mongoose;