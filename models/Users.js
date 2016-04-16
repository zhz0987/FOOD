
var mongoose = require("mongoose");
var config = require("../config/config");
db = mongoose.createConnection(config.DBHOST,config.DBNAME);
var Schema = mongoose.Schema;
var Users = new Schema({
    name:String,
    password:String,
    events:[String]
});
module.exports = db.model("users",Users,"users");