var express = require('express');
var app = express();
var port = 3000;
// var index    = require('./routes/index')
var configDB = require('./config/dbconfig.js');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var user = require('./models/user.js');
var product = require('./models/product');
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
            res.json({'user':myuser});

        }
        
    });


});

app.post('/product',function(req,res){
    var newProduct = {
        nameProduct:req.body.nameProduct,
        price:req.body.price,
        detail:req.body.detail,
        image:req.body.image
    }

    product.create(newProduct,function(err,result){
        if(err){
            console.log(err.errmsg);
            res.end('fail');
        }
        else{
            console.log(result);
            res.end('success');
        }
    })
})
app.get('/allProduct',function(req,res){
    product.find({},function(err,result){
        if(err){
            console.log(err.errmsg);
            res.end('fail');
        }else{
            console.log(result);
            res.json({'product':result});
        }
    })
})

app.post('/addCrat',function(req,res){
    var userID = req.body.userID;
    var ProductId = req.body.ProductId;
    
    product.findOne(ProductId,function(err,result){
        if(err){
            console.log(err.errmsg);
        }
        else{
            user.update({
                _id: userID
              }, {
                $push: {
                  historyCart: result
                }
              },
              function(err, result) {
                if (err) throw err;
                res.json({'product':result});
              }
        
            );
        }
    })
  
})


app.listen(port, function () {
    console.log('Magic is happend on port 3000');
})
