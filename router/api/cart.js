module.exports = (() => {
    const express = require('express');
    const path = require('path');
    const router = express.Router();
    var Cart = require('../../models/cart');
    var Product = require('../../models/product');
    var user = require('../../models/user');

    // middleware to use for all requests
    // const checkAuth = (req, res, next) => {
    //     if (!req.session.user_id) {
    //         req.session.redirectTo = req.headers.referer || req.originalUrl || req.url;
    //         res.json({ 'status': 'fail' });
    //     } else {
    //         next();
    //     }
    //     return;
    // }

    // const checkFree = (req, res, next) => {
    //     if (!req.session.user_id) {
    //         next();
    //     }
    //     return;
    // }

    router.get('/addtocart/:id', function (req, res) {
        var productId = req.params.id;
        var cart = new Cart(req.session.cart ? req.session.cart : {
            items: {}
        });

        Product.findOne({
            'code': productId
        }, function (err, product) {
            if (err) {
                res.json({
                    'status': 'fail'
                });
            }
            if (product) {
                cart.add(product, product.code);
                req.session.cart = cart;
                res.status(200).json({
                    'status': 'success',
                    'qty': cart.totalQty
                });
            }
        });
    });

    router.get('/invoice', function (req, res) {
        var username = req.session.username
        console.log(username);
        var query = {
            username: username
        };
        var order = Math.floor((Math.random()*100000) + 1)

        user.findOne(query, function (err, myuser) {
            console.log(err);
            console.log(myuser);
            req.session.invoice = req.session.cart
            delete req.session.cart
            var cart = new Cart(req.session.invoice);
            res.json({
                items: cart.generateArray(),
                totalPrice: cart.totalPrice,
                'qty': req.session.qty,
                date: new Date().toISOString().slice(0,10),
                order: order,
                name: myuser.firstname,
                lastname: myuser.lastname,
                address: myuser.address,
                tell: myuser.tell,
                email: myuser.email
            });
        });
    });

    router.get('/success', function (req, res) {
        req.session.invoice = req.session.cart
        var cart = new Cart(req.session.cart);
        req.session.qty = cart.totalQty
        var temp = []
        items = cart.generateArray()
        items.forEach(element => {
            temp.push(element.item._id)
            Product.findOne({
                '_id': element.item._id
            }, function (err, product) {
                if (product) {
                    product.quantity--
                        product.save(function (err) {
                            if (err)
                                console.log(err);
                        })
                }
            });
        });
        res.redirect("/invoice.html");
    });

    router.get('/cart', function (req, res) {
        if (!req.session.cart) {
            var tmp = [];
            res.json({
                items: tmp,
                totalPrice: 0
            });
        } else {
            var cart = new Cart(req.session.cart);
            res.json({
                items: cart.generateArray(),
                'qty': cart.totalQty,
                totalPrice: cart.totalPrice
            });
        }
    });



    router.get('/check_cart', function (req, res) {
        res.json({
            cart: req.session.cart
        });

    });

    router.delete('/cart/:code', function (req, res) {
        var cart = new Cart(req.session.cart);
        var cartList = cart.generateArray()
        var code = req.params.code
        for (var i = 0; i < cartList.length; i++) {
            if (code == cartList[i].item.code) {
                cartList.splice(i, 1)
            }
        }
        cart = new Cart({
            items: {}
        });

        for (var i = 0; i < cartList.length; i++) {
            cart.add(cartList[i].item, cartList[i].item.code);
        }
        req.session.cart = cart;
        var cart = new Cart(req.session.cart);
        res.json({
            items: cart.generateArray(),
            'qty': cart.totalQty,
            totalPrice: cart.totalPrice
        });

    });



    router.get('/recommend', function (req, res) {
        mo
        var cart = new Cart(req.session.cart);
        var tmp = cart.generateArray();
        ModelControllers.transaction.getRecomend(tmp, (err, doc) => {
            if (err) {
                res.json({
                    'status': 'fail'
                });
                return;
            } else
                res.json(doc);
            return;
        });

    });

    return router;
})();