require('dotenv').config();
var secrets = {
    mongoUrl : process.env.MONGO_URL
}

module.exports = secrets;