var mongoose = require('mongoose');
var Schema = mongoose.Schema; //order schema

var orderSchema= new Schema({
    'code':Number,
    'items' : {},
    'totalQty':Number,
    'totalPrice':Number,
    'date':{
        type:Date,
        default:Date.now()
    }
})

var order = mongoose.model('order',orderSchema);
module.exports = order;