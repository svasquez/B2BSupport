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

        });
    }

   product.getAllProducts = function () {
       database.getDb().then(function (db) {      
         try {
            return Promise.resolve(db.products.aggregate([
                {
                    $lookup: {
                        from : "categories",
                        localField : "_id",
                        foreignField : "productid",
                        as: "products_categories"
                    }
                }
            ]));
         } catch (error) {
             return Promise.reject(new Error("Error"));
         }
            
        }).catch(function(err){

        });
   }

})(module.exports);