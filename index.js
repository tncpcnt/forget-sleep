var express = require('express');
var app = express();
var port = 3000;
// var index    = require('./routes/index')
var configDB = require('./config/dbconfig.js');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var user = require('./models/user.js');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

mongoose.connect(configDB.url);

//app.use('/api',index);

app.get('/', function (req, res) {
    res.end("Hello world");
});

app.post('/register', function (req, res) {
    //console.log(req.body.username);
    //console.log(req.body.password);
    var newUser = {
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        gender: req.body.gender,
        email: req.body.email
    }

    user.create(newUser, function (err, result) {
        if (err) {
            console.log(err.errmsg)
            res.end("fail");
        } else {
            console.log(result)
            res.end("success");
        }
    });
});


app.post('/login',function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    var query = {username: username, password: password};

    user.findOne(query,function(err,myuser){
        if(err){
            console.log(err.errmsg);
        }
        if(!myuser){
            console.log('Nouser found');
            res.end('fail');
        }
        else{
            console.log(req.body.username);
            console.log(req.body.password);
            res.end('success');

        }
        
    });


});


app.listen(port, function () {
    console.log('Magic is happend on port 3000');
})
