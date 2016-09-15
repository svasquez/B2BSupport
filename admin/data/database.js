// database.js
(function (database) {
  var mongodb = require("mongodb");
  var secret = require("../config/secret");
  var producstData = require("./seedData");

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
            fullfill(theDb);
          }
        });
      } else {
        fullfill(theDb);
      }
    });

  };

  function seedData() {
    database.getDb().then(function (db) {
      db.products.count(function (err, count) {
        if (err) {
          console.log("Failed to seed database");
        } else {
          if (count === 0) {
            console.log("Seeding database..");
            producstData.forEach(function (item) {
              db.products.insert(
                {
                  name: item.name,
                  creationDate: item.creationDate,
                  description: item.description,
                  isEnable: item.isEnabled,
                  modifiedDate: item.modifiedDate
                }, function (err, itemInserted) {
                  if (err) {
                    console.log("Error inserting product");
                  } else {
                    console.log(itemInserted.ops[0]._id);
                    item.categories.forEach(function (category) {
                      db.categories.insert({
                        name: category.name,
                        productid: itemInserted.ops[0]._id,
                        creationDate: category.creationDate

                      });
                    });
                  }
                });
            });
          } else {
            console.log("Database already seed.");
          }
        }
      });

    }).catch(function (err) {
      console.log(err);
    });
  }

  seedData();
})(module.exports);