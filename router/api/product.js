module.exports = (() => {
    const express = require('express');
    const path = require('path');
    const router = express.Router();
    var product = require('../../models/product');
  
    router.post('/product',function(req,res){
        var newProduct = {
            nameProduct:req.body.nameProduct,
            code:req.body.code,
            price:req.body.price,
            detail:req.body.detail,
            image:req.body.image,
            category:req.body.category,
            type:req.body.type,
            quantity :req.body.quantity
        }
    
        product.create(newProduct,function(err,result){
            if(err){
                console.log(err);
                res.end('fail');
                res.redirect('/')
            }
            else{
                console.log(result);
                res.end('success');
            }
        })
    })

    router.get('/product',function(req,res){
        product.find({},function(err,result){
            if(err){
                console.log(err.errmsg);
                res.end('fail');
            }else{
                console.log(result);
                res.json({'product':result});
            }
        })
    })

    router.get('/product/categories/:category',function(req,res){
        var query = req.params.category;
        product.find({'category':query},function(err,result){
            if(err){
                console.log(err.errmsg);
                res.end('fail');
            }else{
                console.log(result);
                res.json({'product':result});
            }
        })
    })

    router.get('/product/categories/:category/:type',function(req,res){
        var query = req.params.category;
        var query2 = req.params.type;
        product.find({'category':query,'type':query2},function(err,result){
            if(err){
                console.log(err.errmsg);
                res.end('fail');
            }else{
                console.log(result);
                res.json({'product':result});
            }
        })
    })

    router.get('/product/:code',function(req,res){
        var query = req.params.code;
        product.find({'code':code},function(err,result){
            if(err){
                console.log(err.errmsg);
                res.end('fail');
            }else{
                console.log(result);
                res.json({'product':result});
            }
        })
    })
  
  
    return router;
  })();
  