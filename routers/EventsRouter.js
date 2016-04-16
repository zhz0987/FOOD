
var EventsModel = require("../models/Events");
exports.getAllEvents = function(req,res){
    var callback = req.query.callback;
    EventsModel.find({},null,{sort: {'_id':-1}},function(err,docs){
        if(err){
            console.log("data load error");
        }
        else{
            var events = {
                "data":[]
            };
            for(var i = 0;i < docs.length; ++i){
                events.data.push(docs[i].name);
            }
            res.send(JSON.stringify(events));
        }
    });
};

exports.getAllEventswithPrice = function(req,res){
    var callback = req.query.callback;
    EventsModel.find({},null,{sort: {'_id':-1}},function(err,docs){
        if(err){
            console.log("data load error");
        }
        else{
            var events = {
                "data":[],
                "price":[]
            };
            for(var i = 0;i < docs.length; ++i){
                events.data.push(docs[i].name);
                events.price.push(docs[i].price);
            }
            res.send(JSON.stringify(events));
        }
    });
};

exports.getEventByName = function (req,res) {
    var name = req.query.name;
    var callback = req.query.callback;
    EventsModel.findOne({name:name}, function (err,doc) {
        if(err){
            console.log("data load error");
        }else{
            var event = doc;
            res.send(JSON.stringify(event));
            //res.jsonp(JSON.stringify(event));
        }
    });
};


exports.getPriceByName = function (req,res) {
    var name = req.query.name;
    var callback = req.query.callback;
    EventsModel.findOne({name:name}, function (err,doc) {
        if(err){
            console.log("data load error");
        }else{
            var price = doc.type;
            res.send(JSON.stringify(price));
        }
    });
};

exports.addEvent = function (req,res) {
  var newEvent = new EventsModel({
      "name":'事件1'
  });
  newEvent.save();
  console.log("保存成功");
  res.send("success");
};

