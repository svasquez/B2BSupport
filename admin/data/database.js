// database.js
(function (database) {
  var mongodb = require("mongodb");
  var secret = require("../config/secret");

  //var mongoUrl = "mongodb://localhost:27017/theBoard";
  var theDb = null;

  database.getDb = function () {
    return new Promise(function (fullfill, reject) {
      if (!theDb) {
        // connect to the database
        mongodb.MongoClient.connect(secret.mongoUrl, function (err, db) {
          if (err) {
            reject(err);
          } else {
            theDb = {
              db: db,
              products: db.collection("products"),
              categories: db.collection("categories")
            };
            //next(null, theDb);
            fullfill(theDb);;
          }
        });
      } else {
        fullfill(theDb);
      }
    });

  }

})(module.exports);