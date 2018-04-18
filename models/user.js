var mongoose = require('mongoose');
var Schema = mongoose.Schema; //user schema

var userSchema = new Schema({
    username:{
        type:String,
        unique: true
    },
    password:String,
    role:{
        type: String,
        default: "User"
    },
    firstname:String,
    lastname:String,
    email:String,
    gender:String,
    brithday : Date,
    tel :String,
    addressHoseNo : String,
    villageNo : String,
    land : String,
    road : String,
    sudDistrict: String,
    district:String,
    province:String,
    zipCode:String,

    historyCart:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'product'
    }]
});



var User = mongoose.model('User',userSchema);
module.exports = User;