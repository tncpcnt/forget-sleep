module.exports = (() => {
    const express = require('express');
    const path = require('path');
    const router = express.Router();
    var product = require('../../models/product');
    var multer = require('multer')
    var storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public/pic')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + getExtensionFile(file.originalname))
        }
    });
    var upload = multer({
        storage: storage
    });

    function getExtensionFile(filename) {
        return "." + filename.split(".")[1]
    }

    router.post('/product', upload.single('image'), function (req, res) {
        var newProduct = {
            nameProduct: req.body.nameProduct,
            code: req.body.code,
            price: req.body.price,
            detail: req.body.detail,
            image: req.file.filename,
            category: req.body.category,
            type: req.body.type,
            quantity: req.body.quantity,
            colors: req.body.colors,
            size: req.body.size
        }

        product.create(newProduct, function (err, result) {
            if (err) {
                console.log(err);
                res.end('fail');
                res.redirect('/')
            } else {
                console.log(result);
                res.end('success');
            }
        })
    })

    router.get('/product', function (req, res) {
        product.find({}, function (err, result) {
            if (err) {
                console.log(err.errmsg);
                res.end('fail');
            } else {
                console.log(result);
                res.json({
                    'product': result
                });
            }
        })
    })

    router.get('/product/categories/:category', function (req, res) {
        var query = req.params.category;
        product.find({
            'category': query
        }, function (err, result) {
            if (err) {
                console.log(err.errmsg);
                res.end('fail');
            } else {
                console.log(result);
                res.json({
                    'product': result
                });
            }
        })
    })

    router.post('/product/categories/', function (req, res) {
        var query = {};
        if (req.body.category) {
            query['category'] = req.body.category;
        }
        if (req.body.type) {
            query['type'] = req.body.type;
        }
        product.find(query, function (err, result) {
            if (err) {
                console.log(err.errmsg);
                res.end('fail');
            } else {
                res.json({
                    'product': result
                });
            }
        })
    })

    router.get('/product/:code', function (req, res) {
        var query = req.params.code;
        product.find({
            'code': code
        }, function (err, result) {
            if (err) {
                console.log(err.errmsg);
                res.end('fail');
            } else {
                console.log(result);
                res.json({
                    'product': result
                });
            }
        })
    })

    router.get('/product/id/:id', function (req, res) {
        var query = req.params.id;
        product.find({
            '_id': query
        }, function (err, result) {
            if (err) {
                console.log(err.errmsg);
                res.end('fail');
            } else {
                console.log(result);
                res.json({
                    'product': result
                });
            }
        })
    })


    return router;
})();