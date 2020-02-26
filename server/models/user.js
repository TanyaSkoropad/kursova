var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 7,
    },
    login: {
        type: String,
        required: true,
        unique: true,
        minlength: 7,
    },
    country: {
        type: String,
    },
    city: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    vereficationCode: {
        type: String,
        required: false
    }
});
userSchema.statics.hashPassword = function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}

userSchema.methods.isValid = function (hashedPassword) {
    return bcrypt.compareSync(hashedPassword, this.password);
}

module.exports = mongoose.model('users', userSchema);
