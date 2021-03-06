module.exports = (() => {
    const express = require('express');
    const path = require('path');
    const router = express.Router();
    var user = require('../../models/user');
    var Order = require('../../models/order');

    router.get('/islogin', function (req, res) {
        if (req.session.username) {
            res.status(200).json({
                'username': req.session.username
            })
        } else {
            res.status(500).json({
                'username': null
            })
        }
    });

    router.post('/login', function (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var query = {
            username: username,
            password: password
        };

        user.findOne(query, function (err, myuser) {
            console.log("test Login");
            if (err) {
                console.log(err.errmsg);
            }
            if (!myuser) {
                console.log('Nouser found');
                res.redirect("/")
            } else {
                req.session.username = username;
                req.session.role = myuser.role;
                if(myuser.role == "User")
                    res.redirect("/");
                else if(myuser.role == "Admin")
                    res.redirect("/admin.html");
                else
                    res.redirect("/");
            }

        });
    });

    router.get('/order', function (req, res) {
        var orders = [];
        user.findOne({'username':req.session.username},function(err,usr){
            console.log("Order jaaa:"+usr.orders);
            res.status(200).json({
                'orders': usr.orders
            })
        })
        
            
    });

    router.get('/logout', function (req, res) {
        delete req.session.username
        delete req.session.role
        delete req.session.cart
        res.status(200).json({
            'message': 'success'
        })
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
            birthDay: req.body.birthDay,
            tel: req.body.tel,
            addressHoseNo: req.body.addressHoseNo,
            villageNo: req.body.villageNo,
            land: req.body.land,
            road: req.body.road,
            subDistrict: req.body.subDistrict,
            district: req.body.district,
            province: req.body.province,
            zipCode: req.body.zipCode
        }

        user.create(newUser, function (err, result) {
            if (err) {
                console.log(err.errmsg)
                res.end("fail");
            } else {
                req.session.username = result.username;
                res.redirect("/");
            }
        });
    });


    return router;
})();