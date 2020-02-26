var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var app = express();
var bcrypt = require('bcrypt');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var User = require('../server/models/user');
var jwt = require('jsonwebtoken');

const cors = require('cors');
app.use(cors());
app.options('*', cors());

mongoose.connect("mongodb://localhost:27017/plart", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(function(){
    console.log('DB Connected!');
})

app.listen(8080, function () {
    console.log('started');
})


var db;


app.post('/registration', function (req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var phone = req.body.phone;
    var password = req.body.password;

    User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        login: email,
        phone: phone,
        password: User.hashPassword(password)
    }, function (err, doc) {
        if (err) return console.log(err);
        return res.send(doc);
    });
})
app.post('/login', function (req, res, next) {
    var login = req.body.username;
    var password = req.body.password;
    var token;
    var promise = User.findOne({login: login}).exec();

    promise.then(function (doc) {
        if (doc) {
            if (doc.isValid(req.body.password)) {
                token = jwt.sign({username: doc.login}, 'secret', {expiresIn: '3h'});
                return res.send({token: token, username: doc.login});

            } else {
                return res.status(501).json({message: ' Invalid Credentials'});
            }
        }
        else {
            return res.status(501).json({message: 'User email is not registered.'})
        }
    });
})


app.get('/user/username/:name', function (req, res) {
    var name = req.params.name;
    var promise = User.findOne({login: name}).exec();
    promise.then(function (doc) {
        return res.send({
            id: doc.id,
            firstName: doc.firstName,
            lastName: doc.lastName,
            password: doc.password,
            email: doc.email,
            phone: doc.phone
        });
    })
})