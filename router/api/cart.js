module.exports = (() => {
    const express = require('express');
    const path = require('path');
    const router = express.Router();
    var Cart = require('../../models/cart');
    var Product = require('../../models/product');
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

    router.get('/addtocart/:id', function(req, res) {
        var productId = req.params.id;
        var cart = new Cart(req.session.cart ? req.session.cart : { items: {} });

        Product.findOne({'code':productId},function(err,product){
            if(err){
                res.json({ 'status': 'fail' });
            }
            if(product){
                cart.add(product, product.code);
                req.session.cart = cart;
                res.status(200).json({ 'status': 'success' ,'qty':cart.totalQty});
            }
        });
    });

    router.get('/cart', function(req, res) {
        if (!req.session.cart) {
            var tmp = [];
            res.json({ items: tmp, totalPrice: 0 });
        } else {
            var cart = new Cart(req.session.cart);
            res.json({ items: cart.generateArray(), totalPrice: cart.totalPrice });
        }
    });

    router.get('/check_cart', function(req, res) {

        res.json({ cart: req.session.cart });

    });

    router.get('/buy', function(req, res) {
        if (!req.session.cart) {
            res.json({ 'status': 'empty' });
        } else {
            var cart = new Cart(req.session.cart);
            var tmp = cart.generateArray();
            var tmp2 = tmp.map(function(a) {
                return { 'beer': a.item._id, 'amount': a.qty };
            })
            var createObj = {};
            createObj['user'] = req.session.user_id;
            createObj['beers'] = tmp2;
            ModelControllers.transaction.createTransaction(createObj, (err, doc) => {
                delete req.session.cart;
                if (err) {
                    res.json({ 'status': 'fail' });
                    return;
                } else
                    res.json({ 'status': 'success' });
                return;
            })
            return;

        }
    });

    router.get('/recommend', function(req, res) {
        var cart = new Cart(req.session.cart);
        var tmp = cart.generateArray();
        ModelControllers.transaction.getRecomend(tmp, (err, doc) => {
            if (err) {
                res.json({ 'status': 'fail' });
                return;
            } else
                res.json(doc);
            return;
        });

    });

    return router;
})();
