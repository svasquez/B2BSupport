var express = require('express');
var apiControllers = require('../api');
var router  = express.Router();

router.get('/products', apiControllers.getAllProducts)
      .post("/products",apiControllers.addProduct);

module.exports = router;

