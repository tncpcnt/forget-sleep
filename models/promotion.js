var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; //promotion schema 

var promotionSchema= new Schema({ 
    'nameProduct' : String, 
    'price' : Number, 
    'detail':String, 
    'image' : String, 
    'category': String, 
    'type': String, 
    'timestamp':{ 
        type:Date, 
        default:Date.now 
    }, 
    'promotionType' : String, 
    'discouunt':Number 
}) 

var promotion = mongoose.model('promotion',promotionSchema); 
module.exports = promotion;