var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var moment = require('moment');

var tasksvar = [{'name':'Buy shit','description':"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting."},{'name':'Name1','description':'description2'}];

app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'))

app.get("/",function(req,res){
    res.render('index',{data:{moment:moment, tasks:tasksvar}});
})

app.post("/", function(req,res){
    console.log(req.body);
    res.send(req.body.firstNum+req.body.secondNum);
})

app.listen(3000);

