module.exports = (() => {
    const express = require('express');
    const router = express.Router();
    router.use('/api', require('./api'));
    router.use('/',require('./views'));
    return router;
  })();