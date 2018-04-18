module.exports = (() => {
    const fs = require("fs");
    const path = require("path");
    const express = require('express');
    const router = express.Router();
  
    const files = fs.readdirSync(__dirname);
  
    files.forEach(function(file) {
  
      if (file !== 'index.js') {
        const moduleName = file.split('.')[0];
        router.use('/', require(path.resolve(__dirname, moduleName)));
      }
    });
    return router;
  })();