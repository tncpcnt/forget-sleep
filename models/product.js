var mongoose = require('mongoose');
var Schema = mongoose.Schema; //product schema

var productSchema= new Schema({
    'nameProduct' : String,
    'code': String,
    'price' : Number,
    'detail':String,
    'image' : String,
    'category': String,
    'type': String,
    'timestamp':{
        type:Date,
        default:Date.now
    },
    'quantity':Number
})

var product = mongoose.model('product',productSchema);
module.exports = product;