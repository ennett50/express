var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
    title:   {
        type:     String,
        required: true,
        unique:   true
    },
    description:   {
        type:     String,
        required: true,
        unique:   true
    },
    created: {
        type:    Date,
        default: Date.now
    },
    numberSort : {
        type: Number,
        default : Date.now()
    }
});

module.exports = mongoose.model('Article', articleSchema);