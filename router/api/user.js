module.exports = (() => {
    const express = require('express');
    const path = require('path');
    const router = express.Router();
    var user = require('../../models/user');
    
    router.get('/islogin',function(req,res){
        if(req.session.username){
            res.status(200).json({'username':req.session.username})
        }
        else{
            res.status(500);
        }
  });
  
    router.post('/login',function(req,res){
        var username = req.body.username;
        var password = req.body.password;
        var query = {username: username, password: password};
    
        user.findOne(query,function(err,myuser){
            console.log("test Login");
            if(err){
                console.log(err.errmsg);
            }
            if(!myuser){
                console.log('Nouser found');
                alert(err)
            }
            else{
                req.session.username = username;
                res.redirect("/");
    
            }
            
        });
  });

  router.post('/register', function (req, res) {
    //console.log(req.body.username);
    //console.log(req.body.password);
    var newUser = {
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        gender: req.body.gender,
        email: req.body.email,
        birthDay : req.body.birthDay,
        tel : req.body.tel,
        addressHoseNo: req.body.addressHoseNo,
        villageNo : req.body.villageNo,
        land: req.body.land,
        road : req.body.road,
        subDistrict : req.body.subDistrict,
        district : req.body.district,
        province : req.body.province,
        zipCode : req.body.zipCode
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


  return router;
})();
