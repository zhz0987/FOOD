
var mongoose = require("mongoose");
var config = require("../config/config");

db = mongoose.createConnection(config.DBHOST,config.DBNAME);
var Schema = mongoose.Schema;
var Events = new Schema({
    name:String,
    type:String,
    price:String,
    keyWords:[String],
    hotTime:[{eventDate:String,hotValue:Number}],
    relateAddress:[String],
    relatePeople:[String],
    emotion:[
        {emotionDate:String,
         emotionValue: [Number]
        }
    ],
    relateNews:[
        {
            newsId:String,
            newsDate:String,
            title:String,
            newsAbstract:String
        }
    ]
});
//console.log("Events.js"+global.db === db);
module.exports = db.model("events",Events,"events");