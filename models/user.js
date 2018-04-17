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
    gender:String
});

var User = mongoose.model('User',userSchema);
module.exports = User;