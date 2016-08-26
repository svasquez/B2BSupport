(function (category) {
    var database = require("./database");
    category.add = function (productid,categoryname) {
        database.then(function (db) {
            var newCategory = {
                productid : productid,
                categorName : categoryname,
                creationDate : new Date()
            };

            db.categories.insert(newCategory , function (err) {
                if(err){
                    return Promise.reject(error);
                }
                
                return Promise.resolve("Success");
            })
        }).catch(function(err){

        });

    };

})(module.exports);