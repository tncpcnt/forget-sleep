var mongoose = require('mongoose');
var Schema = mongoose.Schema; //order schema

var orderSchema= new Schema({
    'code':Number,
    'items' : {},
    'totalQty':Number,
    'totalPrice':Number,
    'date':{
        type:String,
        default:new Date().toISOString().slice(0,10)
    },
    'status':{
        type:String,
        default:"wait for shipping"
    },
    'tracking':{
        type:String,
        default:function(){
            var tmp ="ET";
            for(var i=0;i<9;i++){
                tmp+=Math.floor(Math.random()*10000000000)%9;
            }
            tmp+="TH"
            return tmp;
        }
    }
})

var order = mongoose.model('order',orderSchema);
module.exports = order;