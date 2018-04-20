module.exports = (() => { 
    const express = require('express'); 
    const path = require('path'); 
    const router = express.Router(); 
    var promotion = require('../../models/promotion'); 
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

    router.post('/promotion', upload.single('image'), function (req, res) { 
        var newProduct = { 
            nameProduct: req.body.nameProduct, 
            price: req.body.price, 
            detail: req.body.detail, 
            image: req.file.filename, 
            category: req.body.category, 
            type: req.body.type, 
            promotionType : req.body.promotionType, 
            discouunt : req.body.discouunt 
        } 
        promotion.create(newProduct, function (err, result) { 
            if (err) { 
                console.log(err); 
                res.end('fail'); 
                res.redirect('/') 
            } else { 
                console.log(result); 
                res.redirect('/admin.html') 
            } 
        }) 
    }) 

    router.get('/promotion', function (req, res) { 
        promotion.find({}, function (err, result) { 
            if (err) { 
                console.log(err.errmsg); 
                res.end('fail'); 
            } else { 
                console.log(result); 
                res.json({ 
                    'promotion': result 
                }); 
            } 
        }) 
    }) 

    router.delete('/promotion/:id', function (req, res) { 
        var query = req.params.id; 
        promotion.remove({ _id: query }, function(err) { 
            if (err) { 
            } 
            else { 
                res.redirect('/RemovePromotion.html') 
            } 
        }); 
    }) 

    router.get('/promotion/categories/:category', function (req, res) { 
        var query = req.params.category; 
        promotion.find({ 
            'category': query 
        }, function (err, result) { 
            if (err) { 
                console.log(err.errmsg); 
                res.end('fail'); 
            } else { 
                console.log(result); 
                res.json({ 
                    'promotion': result 
                }); 
            } 
        }) 
    }) 

    router.post('/promotion/categories/', function (req, res) { 
        var query = {}; 
        if (req.body.category) { 
            query['category'] = req.body.category; 
        } 
        if (req.body.type) { 
            query['type'] = req.body.type; 
        } 
        promotion.find(query, function (err, result) { 
            if (err) { 
                console.log(err.errmsg); 
                res.end('fail'); 
            } else { 
                res.json({ 
                    'promotion': result 
                }); 
            } 
        }) 
    }) 

    router.get('/promotion/:discouunt', function (req, res) { 
        var query = req.params.discouunt; 
        promotion.find({ 
            'discouunt': discouunt 
        }, function (err, result) { 
            if (err) { 
                console.log(err.errmsg); 
                res.end('fail'); 
            } else { 
                console.log(result); 
                res.json({ 
                    'promotion': result 
                }); 
            } 
        }) 
    }) 

    router.get('/promotion/id/:id', function (req, res) { 
        var query = req.params.id; 
        promotion.find({ 
            '_id': query 
        }, function (err, result) { 
            if (err) { 
                console.log(err.errmsg); 
                res.end('fail'); 
            } else { 
                console.log(result); 
                res.json({ 
                    'promotion': result 
                }); 
            } 
        }) 
    }) 

 
    return router; 
})();