(function (indexController) {
    var categoryData = require("../data/category");
    var productData = require("../data/product");
    
    indexController.getAllProducts = function (req, res, next) {
        res.set("Content-Type", "application/json");
        
        productData.getAllProducts().then(function (prodCategories) {
            console.log(prodCategories);
            res.send(prodCategories);
        }).catch(function (err) {
         console.log(err);
        });

    };

    indexController.addProduct = function (req,res,next) {
        productData.add(req.body).then(function(product) {
           res.send(product); 
        });
        
    };

})(module.exports);