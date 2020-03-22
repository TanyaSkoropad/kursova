var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var app = express();
var bcrypt = require('bcrypt');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var User = require('../server/models/user');
var Posts = require('../server/models/posts');
var Files = require('../server/models/files');
var jwt = require('jsonwebtoken');
const fileUpload = require('express-fileupload');
var fs = require('fs');
const cors = require('cors');
const serverUrl = 'http://localhost:8080';
app.use(cors());
app.use(fileUpload());
app.options('*', cors());
app.use(express.static('uploads'));
mongoose.connect("mongodb://localhost:27017/plart", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(function () {
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
            if (doc.isValid(password)) {
                token = jwt.sign({username: doc.login}, 'secret', {expiresIn: '240h'});
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
app.get('/upload/:fileId', function (req, res) {
    var fileId = req.params.fileId;
    var promise = Files.findOne({_id: fileId}).exec();
    promise.then(function (doc) {
        var name = doc.fileName;
        var path = require('path');
        var dirname = path.resolve(".") + '/files/';
        var img = fs.readFileSync(dirname + name);
        res.writeHead(200, {'Content-Type': 'image/jpg'});
        res.end(img, 'binary');
    })
});

app.post('/upload', function (req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let file = req.files.file;
    // Use the mv() method to place the file somewhere on your server
    file.mv('../server/files/' + file.name, function (err) {
        if (err) {

            return res.status(500).send(err);
        }
        Files.create({fileName: file.name}, function (err, doc) {
            if (err) {
                return res.sendStatus(409);
            } else {
                console.log(gerFileUrlById(doc._id));
                return res.send({_id: doc._id, url: gerFileUrlById(doc._id)});
            }
        });
    });
});

function getUserFromResponse(req) {
    var token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, 'secret');
    return decoded.username;
}

function gerFileUrlById(fileId) {
    var url = serverUrl + '/upload/' + fileId;
    return url;
}

app.post('/posts', function (req, res) {
    var userName = getUserFromResponse(req);
    var description = req.body.description;
    var location = req.body.location;
    var types = req.body.types;
    var filesId = req.body.files;
    var promise = User.findOne({login: userName}).exec();
    promise.then(function (doc) {
        var userId = doc.id;
        Posts.create({
            description: description,
            location: location,
            types: types,
            creator: userId,
            files: filesId
        }, function (err, doc) {
            if (err) return console.log(err);
            return res.send(doc);
        })
    })
})

app.get('/my-posts', function (req, res) {
    var userName = getUserFromResponse(req);
    var promise = User.findOne({login: userName}).exec();
    promise.then(function (doc) {
        Posts.find({creator: doc.id}, function (err, posts) {
            var result = posts.map(function (post) {
                var links = [];
                post.files.forEach(function (fileId) {
                    links.push(gerFileUrlById(fileId))
                })
                return {
                    types: post.types,
                    description: post.description,
                    location: post.location,
                    files: links
                };
            });
            res.send(result);
        })
    })
})

app.get('/all-posts', function (req, res) {
    var userName = getUserFromResponse(req);
    var promise = User.findOne({login: userName}).exec();
    promise.then(function (doc) {
        Posts.find({}, function (err, posts) {
            var result = posts.map(function (post) {
                var links = [];
                post.files.forEach(function (fileId) {
                    links.push(gerFileUrlById(fileId))
                })
                return {
                    types: post.types,
                    description: post.description,
                    location: post.location,
                    files: links
                };
            });
            res.send(result);
        })
    })
})

app.post('/checkEmail', function (req, res) {
    var email = req.body.email;
    User.exists({login: email}, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
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
