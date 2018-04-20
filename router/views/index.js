module.exports = (() => {
    const fs = require("fs");
    const path = require("path");
    const express = require('express');
    const router = express.Router();

    router.get('/', function (req, res) {
        res.render("../public/views/index.html");
    });

    router.get('/admin', function (req, res) {
      if(req.session.role=='Admin')
      res.render("../public/views/admin.html");
      else{
        res.redirect('/');
      }
  });
    
    router.get('/img/:name',function(req,res){
  
      res.sendFile(path.resolve(__dirname,"../../public/pic/"+req.params.name));
  
    })
  
  
    return router;
  })();
  