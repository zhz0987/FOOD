
var UserModel = require("../models/Users");
var session = require('express-session');

exports.login = function (req,res) {
    var userName = req.body.username;
    var passWord = req.body.password;
    UserModel.findOne({name:userName}, function (err,docs) {
        var obj = {username:userName};
        if(err)
            console.log("data load err");
        if(docs){
            if(docs.password == passWord){
                req.session.user = obj;
                console.log("session" + req.session.user);
                res.send("success");
            }
            else{
                res.send("用户名或密码错误");
            }
        }else{
            res.send("用户不存在");
        }
    });
}

exports.register = function (req,res) {
    var userName = req.body.username;
    var passWord = req.body.password;
    UserModel.findOne({name:userName}, function (err,docs) {
        if(err)
            console.log("data load err");
        if(docs){
            res.send('exists');
        }else{
            var newUser = new UserModel({name:userName,password:passWord,events:[]});
            newUser.save(function (err) {
                if(err){
                    console.log(err);
                    res.send('error');
                }else{
                    req.session.user = docs;
                    res.send('success');
                }
            });
        }
    });
};
exports.getEventsByUser = function (req,res) {
  //var username = req.query.user;
  var username = req.session.user.username;
    console.log("now"+username);
    UserModel.findOne({name:username}, function (err,docs) {
      console.log(docs);
      if(err)
        console.log("data load err");
      else{
          var obj = {events:docs.events};
          res.send(JSON.stringify(obj));
      }
  })
};
exports.addEvents = function (req,res) {
  var name = req.session.user.username;
  var events = req.body.events;
  if(!Array.isArray(events)){
      events = events.split(",");
  }
  UserModel.update({name:name}, {"$push":{"events":{"$each":events}}},function (err,docs) {
      if(err)
        console.log(err);
      else{
          res.send("success");
      }
  });
};
exports.removeEvent = function(req,res){
    var name = req.session.user.username;
    var event = req.body.event;
    UserModel.update({name:name},{"$pull":{"events":event}}, function (err,docs) {
        if(err)
            console.log(err);
        else{
            res.send("success");
        }
    });
};
exports.getUserSession = function (req,res) {
  if(req.session.user){
      res.send(JSON.stringify(req.session.user));
  }else{
      res.send(null);
  }
};