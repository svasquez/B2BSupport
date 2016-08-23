// database.js
(function (database) {

  var mongodb = require("mongodb");
  var secret = require("../config/secret");
  //var mongoUrl = "mongodb://localhost:27017/theBoard";
  var theDb = null;

  database.getDb = function () {
    if (!theDb) {
      // connect to the database
      mongodb.MongoClient.connect(secret.mongoUrl, function (err, db) {
        if (err) {
          return Promise.reject(err);
        } else {
          theDb = {
            db: db,
            products : db.collection("products"),
          };
          //next(null, theDb);
         return  Promise.resolve(theDb)
        }
      });
    } else {
     return Promise.resolve(theDb);
    }
  }

})(module.exports);