var mongoose = require('mongoose');
var Schema = mongoose.Schema; //product schema

var productSchema= new Schema({
    nameProduct : String,
    price : Number,
    detail:String,
    image : String

})

var product = mongoose.model('product',productSchema);
module.exports = product;