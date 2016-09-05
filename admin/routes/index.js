var express = require('express');
var homeController = require('../controllers');
var router = express.Router();

/* GET home page. */
router.get('/', homeController.getIndex);

module.exports = router;
