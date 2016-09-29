(function (product) {
    var database = require("./database");
    product.add = function (pro) {
        return database.then(function (db) {
            var newProduct = {
                name: pro.name,
                description : pro.description,
                creationDate: new Date(),
                isEnabled: true
                
            };

            db.product.insert(newProduct, function (err) {
                if (err) {
                    return Promise.reject(err);
                }

                return Promise.resolve("Success");
            });

        }).catch(function (err) {
            console.log(err);
        });
    };

    product.getAllProducts = function () {
        return database.getDb().then(function (db) {
            var categorysByProducts = db.products.aggregate([
                {
                    $lookup: {
                        from: "categories",
                        localField: "_id",
                        foreignField: "productid",
                        as: "products_categories"
                    }
                }
            ]);
            return Promise.resolve(categorysByProducts.toArray());
        }).catch(function (err) {
            return Promise.reject(new Error("Error"));
        });
    };

    function getCategoriesByProducts(db) {

    }

})(module.exports);