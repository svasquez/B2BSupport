(function(product){
    var database = require("./database");
    product.add = function (name) {
        database.then(function (db) {
            var newProduct = {
                name : name,
                creationDate: new Date()
            };
            db.product.insert(newProduct)
        }).catch(function(err){

        });
    }
})(module.exports);