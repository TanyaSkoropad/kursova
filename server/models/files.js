var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const filesSchema = new Schema({
    fileName: {
        type: String,
        required: true,
        maxlength: 500
    }
});

module.exports = mongoose.model('files', filesSchema);

