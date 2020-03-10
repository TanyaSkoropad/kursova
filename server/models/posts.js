var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const postsSchema = new Schema({
    description: {
        type: String,
        required: false,
        maxlength: 500
    },
    location: {
        type: String,
        required: false,
        maxlength: 100
    },
    types: [String],
    creator:{
        type: Schema.Types.ObjectId,
        ref : "users"

    }
});

module.exports = mongoose.model('posts', postsSchema);

