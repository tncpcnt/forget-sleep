var express = require('express');
var app = express();
var port = 3000;
var path = require('path')
var fs = require('fs')
// var index    = require('./routes/index')
const session = require('express-session');
var configDB = require('./config/dbconfig.js');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var user = require('./models/user.js');
var product = require('./models/product');
var engines = require('consolidate');

app.set('views', __dirname + '/public/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/views')));
app.use(express.static(path.join(__dirname, 'public/pic')));

mongoose.connect(configDB.url);
app.use(session({
    secret: 'beeandpang',
    resave: false,
    saveUninitialized: true
}));

app.use('/', require('./router'));



app.post('/addCart',function(req,res){
    var userID = req.body.userID;
    var ProductId = req.body.ProductId;
    
    product.findOne(ProductId,function(err,product){
        if(err){
            console.log(err.errmsg);
        }
        else{
            
            user.update({
                _id: userID
              }, {
                $push: {
                  historyCart: product
                }
              },
              function(err, result) {
                if (err) throw err;
                res.json({'product':product});
              }
        
            );
        }
    })
  
})


app.listen(port, function () {
    console.log('Magic is happend on port 3000');
})
