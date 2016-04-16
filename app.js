var express = require('express');
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var session = require('express-session');

var config = require("./config/config");
var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
var HOST = config.DBHOST; //数据库地址
var DBNAME = config.DBNAME;
var events = require("./routers/EventsRouter");
var users = require("./routers/UserRouter");
global.db = mongoose.createConnection(HOST,DBNAME);
console.log("app.js"+global.db.name);
db.on("error",function(){
    console.log("database link failed");
});
db.on("open",function(){
    console.log("database link success");
});
app.use(session({
    secret: 'secret',
    resave:false,
    rolling: true,
    saveUninitialized: true,
    cookie:{
        maxAge: 1000*60*30
    }
}));
app.use('/dist/index.html', function (req,res,next) {

    if(!req.session.user){
        res.redirect("./indexfirst.html");
        return;
    }
    next();
});
app.use('/dist',express.static(__dirname + '/dist'));


app.get('/events',events.getAllEvents);
app.get('/eventswithprice',events.getAllEventswithPrice);
app.get('/getEventByName',events.getEventByName);
app.get('/getPriceByName',events.getPriceByName);

app.post('/login',users.login);
app.post('/register',users.register);
app.get('/getEventsByUser',users.getEventsByUser);
app.get('/getUserSession',users.getUserSession);
app.post('/addEvents',users.addEvents);
app.post('/removeEvent',users.removeEvent);
app.get('/logout', function (req,res) {
    req.session.user = null;
    res.redirect('./dist/indexfirst.html');
});
app.get('/', function (req,res) {
    res.redirect('./dist/indexfirst.html');
});
app.listen(3001, function () {
    console.log('app is listening at port 3000');
});


