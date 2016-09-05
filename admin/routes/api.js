var express = require('express');
var apiControllers = require('../api');
var router  = express.Router();

router.get('/products', apiControllers.getAllProducts);

module.exports = router;

