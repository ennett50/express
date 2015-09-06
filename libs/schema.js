var mongoose = require('mongoose');


// this schema can be reused in another schema
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