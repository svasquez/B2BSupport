(function(product){
    var database = require("./database");
    product.add = function (name) {
        database.then(function (db) {
            var newProduct = {
                name : name,
                creationDate: new Date()
            };
            
            db.product.insert(newProduct,function (err) {
                if(err){
                    return Promise.reject(error);
                }
                
                return Promise.resolve("Success");
            });
            
        }).catch(function(err){
            console.log(err);
        });
    }

   product.getAllProducts = function () {
       database.getDb().then(function (db) {   
             var categorysByProducts = db.products.aggregate([
                {
                    $lookup: {
                        from : "categories",
                        localField : "_id",
                        foreignField : "productid",
                        as: "products_categories"
                    }
                }
            ]);
            return Promise.resolve(categorysByProducts); 
        }).catch(function(err){
            return Promise.reject(new Error("Error"));
        });
   }

})(module.exports);